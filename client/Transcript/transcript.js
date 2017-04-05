// const App = require('App.vue');
// Vue.http.headers.common['Access-Control-Allow-Origin'] = value;


var card = new Vue({
  el: '#messages',
  data: {
    title: "Transcript",
    data: {
        imageLink: ''
    }
  },
  filters: {
    capitalize: function(value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    undercase: function(value) {
      if (!value) return '';
      value = value.toString();
      return value.toLowerCase();
    }
  },
  methods: {
    addCanvas: function() {
      var input = document.getElementById('itemForm');
      const msg = {};
      this.$http.get('/getCanvas/1').then(response => {
        console.log(response.body);
        document.getElementById('canvasImg').src = response.body.canvas;
        console.log(this.data.imageLink);
      }, response => {
        console.log('inside post request error');
      });
    },
    addNotes: function() {
      
    },
    deleteItem: function(index) {
      // this.messages.splice(index, 1);
    }
  }
})
