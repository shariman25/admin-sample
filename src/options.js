const User = require('./models/user')
const bcrypt = require('bcrypt')

//Admin Bro
const canModifyUsers = ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin'

const AdminBroOptions = {
    resources: 
    [
      {
        resource: User,  
        options: {
          properties: {
            encryptedPassword: { isVisible: false },
            password: {
              type: 'string',
              isVisible: {
                list: false, edit: true, filter: false, show: false,
              },
            },
          },
          actions: {
            new: {
              before: async (request) => {
                if(request.payload.password) {
                  request.payload = {
                    ...request.payload,
                    encryptedPassword: await bcrypt.hash(request.payload.password, 10),
                    password: undefined,
                  }
                }
                return request
              },
            },
            //edit: { isAccessible: canModifyUsers },
            edit: {
              before: async (request) => {
                if(request.payload.password) {
                  request.payload = {
                    ...request.payload,
                    encryptedPassword: await bcrypt.hash(request.payload.password, 10),
                    password: undefined,
                  }
                }
                return request
              },
            },
            delete: { isAccessible: canModifyUsers },
            // new: { isAccessible: canModifyUsers },
          }
        }
      }
    ],
  }


module.exports = AdminBroOptions;