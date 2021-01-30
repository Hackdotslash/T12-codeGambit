import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../../search.dart';

class SignUp extends StatefulWidget {
  @override
  _SignUpState createState() => _SignUpState();
}

class _SignUpState extends State<SignUp> {
  String _emailid, _password, _name, _city, _contact, _age;

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final firestoreInstance = FirebaseFirestore.instance;

  Future<void> signup() async {
    final formState = _formKey.currentState;
    if (formState.validate()) {
      formState.save();
      try {
        User user = (await FirebaseAuth.instance.createUserWithEmailAndPassword(
                email: _emailid, password: _password))
            .user;
        await firestoreInstance.collection("users").add({
          "name": _name,
          "age": _age,
          "contact": _contact,
          "city": _city,
        });
        Navigator.of(context).push(MaterialPageRoute(builder: (context) => SearchScreen()));
      } catch (e) {
        print(e.message);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('LOGIN'),
      ),
      body: Form(
        key: _formKey,
        child: Padding(
          padding: const EdgeInsets.all(10.0),
          child: SingleChildScrollView(
            child: Column(
              children: <Widget>[
                TextFormField(
                  validator: (input) {
                    if (input.isEmpty) {
                      return 'Please enter your email';
                    }
                  },
                  onSaved: (input) => _emailid = input,
                  decoration: InputDecoration(
                    labelText: 'Email',
                  ),
                ),
                TextFormField(
                  validator: (input) {
                    if (input.isEmpty) {
                      return 'Please enter your password';
                    }
                  },
                  onSaved: (input) => _password = input,
                  decoration: InputDecoration(
                    labelText: 'Password',
                  ),
                ),
                TextFormField(
                  validator: (input) {
                    if (input.isEmpty) {
                      return 'Please enter your name';
                    }
                  },
                  onSaved: (input) => _name = input,
                  decoration: InputDecoration(
                    labelText: 'Name',
                  ),
                ),
                TextFormField(
                  validator: (input) {
                    if (input.isEmpty) {
                      return 'Please enter your age';
                    }
                  },
                  onSaved: (input) => _age = input,
                  decoration: InputDecoration(
                    labelText: 'Age',
                  ),
                ),
                TextFormField(
                  validator: (input) {
                    if (input.isEmpty) {
                      return 'Please enter you Contact';
                    }
                  },
                  onSaved: (input) => _contact = input,
                  decoration: InputDecoration(
                    labelText: 'Contact',
                  ),
                ),
                TextFormField(
                  validator: (input) {
                    if (input.isEmpty) {
                      return 'Please enter you city';
                    }
                  },
                  onSaved: (input) => _city = input,
                  decoration: InputDecoration(
                    labelText: 'City',
                  ),
                ),
                RaisedButton(
                  onPressed: () {
                    signup();
                  },
                  child: Text('REGISTER'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
