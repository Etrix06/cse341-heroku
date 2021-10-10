const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorController = require('./controllers/error');
const User = require('./models/user');
const cors = require('cors');
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const corsOptions = {
  origin: "https://https://project341.herokuapp.com/",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4
};

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://etrix06:88qunwMxH3OSBV2s@cse341cluster-3dwlw.mongodb.net/test?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('61625fcd7b05f286b2a85bd3')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://etrix06:88qunwMxH3OSBV2s@cluster0.x7q6a.mongodb.net/shop?retryWrites=true&w=majority')
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Erik',
          email: 'erik@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(process.env.PORT || 3000);
    console.log('listening on 3000');
  })
  .catch(err => {
    console.log(err);
  });

