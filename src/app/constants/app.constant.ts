

export var isSmallScreen = window.screen.width < 992;

export var backendUrl = "http://bakendtwofour-env.eba-2ezcpqfm.us-east-2.elasticbeanstalk.com/"
//export var backendUrl = "http://localhost:5000/"

export var image_server_url = "http://twoforpicturefix-env.eba-2aehqx9u.us-east-2.elasticbeanstalk.com/" 
//export var image_server_url = "http://localhost:8082/"

export enum Actions {
  logOff,
  login,
  signup,
  submit,
  generateCode,
  authenicateCode,
  currrentContest,
  previousContest
}  