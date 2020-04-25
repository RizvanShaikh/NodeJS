const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../lib/user/userRoute.js');
const conn = require('../../../lib/config/dbConfig');

describe('POST /login', () => {
    before((done) => {
        conn.connect()
        .then(() => done())
        .catch((err) => done (err));
    })
})

after((done) => {
    conn.close()
    .then(() => done())
    .catch((err) => done(err));
})

it('ok, creating a new note works', (done) => {
    request(app).post('/login')
    .send({ email: 'Abrahm@gmail.com', password: '123123'})
    .then((res) => {
        const body = res.body;
        expect(body).to.contain.property('_id');
        expect(body).to.contain.property('bonus');
        expect(body).to.contain.property('favCourses');
        expect(body).to.contain.property('referralCodeUsedBy');
        expect(body).to.contain.property('userImage');
        expect(body).to.contain.property('firstName');
        expect(body).to.contain.property('lastName');
        expect(body).to.contain.property('experience');
        expect(body).to.contain.property('dateOfBirth');
        expect(body).to.contain.property('gender');
        expect(body).to.contain.property('userType');
        expect(body).to.contain.property('email');
        expect(body).to.contain.property('password');
        expect(body).to.contain.property('referralCode');
        expect(body).to.contain.property('refferncedBy');
        expect(body).to.contain.property('welcome');
        expect(body).to.contain.property('token');
        expect(body).to.contain.property('resetPasswordTimeout');
        expect(body).to.contain.property('resetPasswordToken');
        done();
    })
    .catch((err)=> done(err));
})
// https://github.com/kriscfoster/expres...
// npm install --save mocha chai supertest mockgoose