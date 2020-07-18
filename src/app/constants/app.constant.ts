

export var isSmallScreen = window.screen.width < 992;

export var backendUrl = 'https://blumorel-backend.herokuapp.com/'
// export var backendUrl = "http://localhost:5000/"

export var image_server_url = 'https://app-loop-content-server.herokuapp.com/'
//export var image_server_url = "http://localhost:8082/"

export var seedUrl = 'https://blumorel-backend.herokuapp.com/'
// export var backendUrl = "http://localhost:5000/"

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