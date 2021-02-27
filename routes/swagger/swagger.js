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
      // securityDefinitions: {
      //   agentAccessToken: {
      //       type: 'apiKey',
      //       name: 'X-ACCESS-TOKEN',
      //       in: 'header'
      //   }
      // },
      // security: [
      //   { agentAccessToken: [] }
      // ],
      // components: {
      //   res: {
      //     BadRequest: {
      //       description: '잘못된 요청.',
      //       schema: {
      //         $ref: '#/components/errorResult/Error'
      //       }
      //     },
      //     Forbidden: {
      //       description: '권한이 없음.',
      //       schema: {
      //         $ref: '#/components/errorResult/Error'
      //       }
      //     },
      //     NotFound: {
      //       description: '없는 리소스 요청.',
      //       schema: {
      //         $ref: '#/components/errorResult/Error'
      //       }
      //     }
      //   },
      //   errorResult: {
      //     Error: {
      //       type: 'object',
      //       properties: {
      //         errMsg: {
      //           type: 'string',
      //           description: '에러 메시지 전달.'
      //         }
      //       }
      //     }
      //   }
      // },
    },
    apis: ['./routes/**/*.js'] // api 파일 위치들
  };