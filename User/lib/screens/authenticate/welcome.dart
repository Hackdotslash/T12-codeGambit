import 'package:flutter/material.dart';
import 'package:user_app/screens/authenticate/login.dart';
import 'package:user_app/screens/authenticate/signup.dart';

class WelcomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Welcome!!'),
      ),
      body: Center(
        child: Column(
          children: <Widget>[
            FlatButton(
              child: Text('REGISTER'),
              onPressed: () {
                Navigator.of(context).push(MaterialPageRoute(builder: (context) => SignUp()));
              },
              color: Colors.green,
            ),
            SizedBox(
              height: 10.0,
            ),
            FlatButton(
              child: Text('LOGIN'),
              onPressed: () {
                Navigator.of(context).push(MaterialPageRoute(builder: (context) => LoginPage()));
              },
              color: Colors.blue,
            ),
          ],
        ),
      ),
    );
  }
}
