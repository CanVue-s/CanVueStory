// Instance is created via object constructor and takes an option where to bound
// vm in this case stands for viewmodel, but can be any string
var vm = new Vue({
  el: '#login-page',
  data: {
    username: '',
    password: '',
    email: '',
    noAccount: true
  },
  methods: {
    login: function () {
      this.noAccount = false;
      // check if the data stored in server is accurate
    },
    signup: function () {
      this.noAccount = true;
      // make post routes to server
    }
  }
});