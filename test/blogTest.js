const chai = require('chai')
const server = require('../index')
const chaiHttp = require('chai-http')
const route = require('../route/blogRoute')
const Schema = require('../model/blogModelSchema')
const { request } = require('chai')

chai.should()
chai.use(chaiHttp)

describe('Blog Like API', () => {
    describe('/POST/api/blog', () => {
        it('It should return blog like details', (done) => {
            const like = {
                blogLike: true
            }
            chai
                .request(server)
                .post('/blog/create_blog/63edf91265f1ea7a170c189fv')
                .send(like)
                .end((err, res) => {
                    res.should.have.status(202)
                    res.body.should.have.property('success').eq('success')
                    res.body.should.have.property('message').eq('Blog is created.')
                    res.body.should.have.property('data')
                    done();
                })
        })

        it('It should return blog dislike details', (done) => {
            const like = {
                blogLike: false
            }
            chai
                .request(server)
                .post('/blog/like/63f73ebc3841d6a6d77775ac')
                .send(like)
                .end((err, res) => {
                    res.should.have.status(202)
                    res.body.should.have.property('success').eq('success')
                    res.body.should.have.property('message').eq('you just dislike this blog')
                    res.body.should.have.property('data')
                    done();
                })
        })
    })
})

describe("List All Blog API", () => {
    describe("GET/api/blogs", () => {
        it("It should return all blogs list:", (done) => {
            chai
                .request(server)
                .get("/blog/list")
                .end((err, res) => {
                    res.should.have.status(200)
                    res.should.be.a("object")
                    res.body.should.have.property("success").eq("success")
                    res.body.should.have.property("data")
                    done()
                })
        });
    });
});

describe('Edit blog Api', () => {
    describe("PATCH/api/blog", () => {
        it('it should return edited blog', (done) => {
            const data = {
                blogTitle: "javascript",
                blogDescription: "it run on V8 engine"
            }
            chai
                .request(server)
                .patch('/blog/blog_update/63ff4f8d53c7f9d37dfd358c')
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.have.property("success").eq("success")
                    res.body.should.have.property("message").eq("Blog updated successfully.")
                    done();
                })
        })
    })
})

describe('delete blog API', () => {
    describe('DELETE/api/blog', () => {
        it('it should return delete blog', (done) => {
            chai
                .request(server)
                .delete('/blog/blog_del/63ff4d418e9b3fe995217648')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property("success").eq("success")
                    res.body.should.have.property("message").eq("Blog deleted successfully.")
                    done();
                })
        })
    })
})

describe('add blog API', () => {
    describe('POST/api/blog', () => {
        it('it should return add blog', (done) => {
            const blog = {
                blogTitle: "manchuriam",
                blogDescription: "dine into my kitchen"
            }
            chai
                .request(server)
                .post('/blog/create_blog/63edf91265f1ea7a170c189f')
                .set('Content-Type', "appliaction/x-www-form-urlencoded")
                .field(blog)
                .attach("blogImage", "/Users/vijay/OneDrive/Pictures/er.png",
                    "er.png"
                )
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.have.property("success").eq("success")
                    res.body.should.have.property("blog")
                    res.body.should.have.property('message').eq('Blog is created')
                    done();
                })
        })
    })
})

// describe('search blog API', () => {
//     describe('POST/api/blogs', () => {
//         it('it should return search blog details', (done) => {
//             const data = {
//                 title: "java"
//             }
//             chai
//                 .request(server)
//                 .post('/blog/search')
//                 .end((err, res) => {
//                     res.should.have.status(200)
//                     res.body.should.have.property("success").eq("success");
//                     res.body.should.have.property("data")
//                 })
//         })
//     })
// })

describe('User blogg API', () => {
    describe('POST/api/blogs', () => {
        it('it should return blog of user detail', (done) => {
            chai
                .request(server)
                .post('/blog/user_blog/63edf91265f1ea7a170c189f')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property('success').eq('success')
                    res.body.should.have.property('blogDetail')
                    done();
                })
        })
    })
})

// describe('detail blog API', () => {
//     describe('POST/api/blogs', () => {
//         it('it should return detailed blog', (done) => {
//             chai
//                 .request(server)
//                 .get('/blog/details/63fed89b57d08b091744dfb2')
//                 .end((err, res) => {
//                     res.should.have.status(200)
//                     res.body.should.have.property('success').eq('success')
//                     res.body.should.have.property('blog').property('userId').property('FullName')
//                     done();
//                 })
//         })
//     })
// })
