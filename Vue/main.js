// const App = require('App.vue');
// Vue.http.headers.common['Access-Control-Allow-Origin'] = value;


var card = new Vue({
  el: '#messages',
  data: {
    title: "Transcript",
    messages: [
      {
        username: 'littleToy',
        createdAt: new Date(Date.now()),
        message: "how ya'll doing?"
      },
      {
        username: 'kbbqiu',
        createdAt: new Date(Date.now()),
        message: "what? CSS sucks"
      },
      {
        username: 'Naomi',
        createdAt: new Date(Date.now()),
        message: "testing Vue. I'm boring, I know"
      }
    ]
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
    addItem: function() {
      var input = document.getElementById('itemForm');
      const msg = {};
      if (input.value !== '') {
        // console.log(input.value);
        msg.username = 'kevin';
        msg.createdAt = new Date(Date.now());
        msg.message = input.value;
        this.messages.push(msg)
        input.value = "";
      }

      // this.$http.post('/', msg, {
      //   emulateJSON: true
      // }).then(response => {
      //   console.log('posted');
      // });

      $.ajax({
        url: 'http://localhost:8080/',
        dataType: "json",
        contentType: "application/json",
        type: 'POST',
        data: JSON.stringify(msg),
        success: (data) => {
          console.log('success')
        },
      }).then((data) => {
        console.log(data);
      })

      this.$http.get('/messages').then(response => {
        for (let i = 0; i < response.body.length; i += 1) {
          // console.log(response.body[i].createdAt);
          this.messages.push({
            username: response.body[i].name,
            createdAt: response.body[i].createdAt,
            message: response.body[i].message
          })

        }
        // console.log(response.body);
      }, response => {
        console.log('inside post request error');
      });

    },
    deleteItem: function(index) {
      this.messages.splice(index, 1);
    }
  }
})
