const request = require('supertest');
const app = require('../src/server');
const expect = require('chai').expect;

describe('Admin API', function() {
    // 1 login : success login
    it('Should success if credential is valid', function(done) {
        request(app)
           .post('/admin/login')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send({ email: 'admin@email.com', password: 'password' })
           .expect(302)
           .end(done);
    }); 

    // 2 login : failed login
    it('Should failed if credential is invalid', function(done) {
        request(app)
           .post('/admin/login')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send({ email: 'notadmin@email.com', password: 'password' })
           .expect(200)
           .end(done);
    }); 

    // 3 admin : Create user, role = member

    // 4 admin : edit user, role = member

    // 5 admin : delete user, role = member
    
});