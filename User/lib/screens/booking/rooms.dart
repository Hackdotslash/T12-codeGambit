import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:user_app/search.dart';

class RoomScreen extends StatefulWidget {
  final id;
  RoomScreen({@required this.id});

  @override
  _RoomScreenState createState() => _RoomScreenState(id);
}



class _RoomScreenState extends State<RoomScreen> {
  QueryDocumentSnapshot id;
  _RoomScreenState(this.id);


  final firestoreInstance = FirebaseFirestore.instance;
  Future<void> update() async {

    try {

      await firestoreInstance.collection("bookings").add({
        "name": 'XYZ',
        "age": 20,
        "contact": 9999999999,
        "city": 'Surat',
      });
      Navigator.of(context).push(MaterialPageRoute(builder: (context) => SearchScreen()));
    } catch (e) {
      print(e.message);
    }

  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Room Avalability'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(10.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            Text('Number of rooms available are : ' + id['availableRooms'],
            style: TextStyle(
              fontSize: 20.0,
            ),
            ),
            SizedBox(height: 10.0),
            FlatButton(
              onPressed: () {
                update();
              },
              child: Text('Request'),
              color: Colors.green,

            ),
          ],
        ),
      ),
    );
  }
}
