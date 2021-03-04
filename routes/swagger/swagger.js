module.exports = {
    swaggerDefinition: {
      // 정보
      openapi: "3.0.0",
      info: {
        title: 'Demo Server Document',
        version: '1.0.0',
        description: 'Make for using apis',
        contact:{
          name:'skyu',
          url:'https://github.com/sk-yu',
          email:'skyu82@gmail.com'
        },
      },
      components: {
        securitySchemes: {
          accessToken: {
            type:'apiKey',
            name:'X-ACCESS-TOKEN',
            in:'header',
          }
        }
      },
      security: {
        accessToken: []
      },
    },
    apis: ['./routes/**/*.js'] // api 파일 위치들
  };