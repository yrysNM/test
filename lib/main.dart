import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        // backgroundColor: Colors.deepPurple[100],
        // appBar: AppBar(
        //   title: Text("Test app", style: TextStyle(color: Colors.white)),
        //   elevation: 0,
        //   leading: Icon(Icons.menu, color: Colors.white),
        //   backgroundColor: Colors.deepPurple,
        //   actions: [
        //     IconButton(
        //       onPressed: () {},
        //       icon: Icon(Icons.logout, color: Colors.white),
        //     ),
        //   ],
        // ),

        /**
         * BODY first practice1
         * 
        body: Center(
          child: Container(
            height: 300,
            width: 300,
            decoration: BoxDecoration(
              color: Colors.deepPurple,
              borderRadius: BorderRadius.circular(20),
            ),
            padding: EdgeInsets.all(25),
            // child: Text(
            //   'Hello world',
            //   style: TextStyle(
            //     color: Colors.white,
            //     fontSize: 28,
            //     fontWeight: FontWeight.bold,
            //   ),
            // ),
            child: Icon(Icons.favorite, color: Colors.white, size: 65),
          ),
        ),
         * 
         *
         */
        body: Column(
          // mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          // crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            // 1first box
            Expanded(
              child: Container(
                // height: 200,
                // width: 200,
                color: Colors.deepPurple,
              ),
            ),

            // 2nd box
            Expanded(
              flex: 3,
              child: Container(
                // height: 200,
                // width: 200,
                color: Colors.deepPurple[600],
              ),
            ),

            // 3rd box
            Expanded(
              child: Container(
                // height: 100,
                // width: 100,
                color: Colors.deepPurple[300],
              ),
            ),
          ],
        ),
      ),
      debugShowCheckedModeBanner: false,
    );
  }
}

// class MyApp extends StatelessWidget {
//   MyApp({super.key});

//   // variables
//   String name = 'Hello WORLD';
//   int age = 23;
//   double pi = 3.14;
//   bool isTrue = true;

//   // function
//   void greet() {
//     print("Hello TEST");
//   }

//   void greetPet(String name) {
//     print("Hello " + name);
//   }

//   @override
//   Widget build(BuildContext context) {
//     // loops
//     // for (int i = 3; i <= 5; i++) {
//     // print(i);
//     // }

//     // greet();
//     // greetPet("EFWFWEF");
//     return const MaterialApp(
//       home: Scaffold(),
//       debugShowCheckedModeBanner: false,
//     );
//   }
// }
