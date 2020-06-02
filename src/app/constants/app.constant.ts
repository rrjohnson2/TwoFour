

export var isSmallScreen = window.screen.width < 992;

export var backendUrl = "http://bakendtwofour-env.eba-2ezcpqfm.us-east-2.elasticbeanstalk.com/"

export var image_server_url = "http://smsemail-env.eba-tbvf2xp5.us-east-2.elasticbeanstalk.com/"

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