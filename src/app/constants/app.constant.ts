

export var isSmallScreen = window.screen.width < 992;

//export var backendUrl = 'https://blumorelbackend.net/'
 export var backendUrl = "http://localhost:5000/"

//export var image_server_url = 'https://blumorelphoto.net/'
 export var image_server_url = "http://localhost:8082/"

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