let server = require('../index');
let chiHttp = require('chai-http');
var chai = require('chai')
const utils = require('../model/userModelSchema');
const route = require('../route/userRoute')
const randomEmail = require('random-email')

chai.should();
chai.use(chiHttp);

describe('User login api', () => {
    describe('POST/api/user', () => {
        it('It should return login user detail : ', (done) => {
            const data = {
                userEmail: "vijaylaxmiborasi156@gmail.com",
                password: "Vijay@12"
            };
            chai
                .request(server)
                .post('/user/signin')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a("object");
                    res.body.should.have.property('success').eq('success');
                    res.body.should.have.property('message').eq('SignIn Success');
                    res.body.should.have.property('token');
                    done();
                })
        })
        it("It should return error message detail : ",(done)=>{
            const data ={
                userEmail: "vijaylaxmiborasi15@gmail.com",
                password: "Vijay@12"
            };
            chai
            .request(server)
            .post('/user/signin')
            .send(data)
            .end((err, res)=>{
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('success').eq('failure');
                res.body.should.have.property('message').eq('Invalid credentials.');
            })
            done();
        })
        it("It should return email or  password error message : ",(done)=>{
            const data = {
                userEmail: "vijaylaxmiborasi156@gmail.com",
                password: "Vijay@1"
            };
            chai
            .request(server)
            .post('/user/signin')
            .send(data)
            .end((err, res)=>{
                res.should.have.status(401);
                res.should.be.a('object');
                res.body.should.have.property('success').eq('failure');
                res.body.should.have.property('message').eq('Invalid credentials.');
              done();
            })
        })
    })
})

describe('User signup api', () => {
  describe('POST/api/user', () => {
    it('It should return user with this email already registered : ',(done)=>{
       let email = randomEmail({domain: 'gmail.com'});
        const data = {
            fullName : "Rebecca",
    userEmail : 'rebacca@gmail.com',
    city : "california",
    phoneNo : "2589634752",
    address : " nandbagh",
    password : "Tingt@ng7"
        };
        chai
        .request(server)
        .post('/user/signup')
        .send(data)
        .end((err, res)=>{
            res.should.have.status(409);
           res.should.be.a('object');
            res.body.should.have.property('success').eq('failure');
            res.body.should.have.property('message').eq('User with this email is already register.');
            done();
        })
    })
    it('It should return User data registered : ',(done)=>{
        let email = randomEmail({domain: 'gmail.com'});
        const data = {
            fullName : "Rebecca",
            userEmail : email,
            city : "california",
            phoneNo : "2589634752",
            address : " nandbagh",
            password : "Tingt@ng7"
        };
        chai
        .request(server)
        .post('/user/signup')
        .send(data)
        .end((err, res)=>{
            res.should.have.status(201);
            res.should.be.a('object');
            res.body.should.have.property('success').eq('success');
            res.body.should.have.property('message').eq('Signup completed.');
            done();
        })
    })
  })
  
})

describe('reset password email api', () => {
  describe('POST/api/user', () => {
it('It should return password reset using email : ',(done)=>{
    const data = {
        userEmail : "vijaylaxmiborasi1526@gmail.com"
    };
    chai.request(server)
    .post('/user/reset_password')
    .send(data)
    .end((err, res)=>{
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('success').eq('success');
        res.body.should.have.property('message').eq('Email sent successfully.');
        done();
    })
}) 
it('It should return password reset error : ',(done)=>{
    const data = {
        userEmail : 'jfh@gmail.com'
    };
    chai
    .request(server)
    .post('/user/reset_password')
    .send(data)
    .end((err, res)=>{
        res.should.have.status(401);
        res.should.be.a('object');
        res.body.should.have.property('success').eq('failure');
        res.body.should.have.property('message').eq('Invalid credentials');
        done();
    })
})   
  })
  
})

describe('user password reset api', () => {
  describe('POST/api/user', () => {
    it('It should return user reset password : ',(done)=>{
        const data = {
            newPassword : "Vill@23",
            confirmPassword : "Vill@23"
        }
        chai
        .request(server)
        .post('/user/forget_password/63ee14900d93246a55272295/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2VlMTQ5MDBkOTMyNDZhNTUyNzIyOTUiLCJpYXQiOjE2Nzc2Njc5NTcsImV4cCI6MTY3ODA5OTk1N30.LKlEm2KIto1v3rj9y88PdJqf6JoS8JgYLJ2t4WlQ7S4')
        .send(data)
        .end((err, res)=>{
            res.should.have.status(202);
            res.should.be.a('object');
            res.body.should.have.property('success').eq('success');
            res.body.should.have.property('message').eq('Password updated successfully.');
            done();
        })
    })

    it('It should return reset password error : ',(done)=>{
        const data = {
            newPassword : "Vill@2",
            confirmPassword : "Vill@23"
        }
        chai
        .request(server)
        .post('/user/forget_password/63ee14900d93246a55272295/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2VlMTQ5MDBkOTMyNDZhNTUyNzIyOTUiLCJpYXQiOjE2Nzc2Njc5NTcsImV4cCI6MTY3ODA5OTk1N30.LKlEm2KIto1v3rj9y88PdJqf6JoS8JgYLJ2t4WlQ7S4')
        .send(data)
        .end((err, res)=>{
            res.should.have.status(403);
            res.should.be.a('object');
            res.body.should.have.property('success').eq('failure');
            res.body.should.have.property('message').eq('New password and confirm password does not match.');
            done();
        })
    })
  })
  
})


