import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  static const List names = ['Test1', "test,2", 'test,3'];

  void userTapped() {
    print('hello world@@@@');
  }

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

        /** BODY first practice1
         * 
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
        /** List view axis horizontal vertical
         *  
        body: ListView(
          scrollDirection: Axis.horizontal,
          // mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          // crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            // 1first box
            Container(width: 200, color: Colors.deepPurple),

            // 2nd box
            Container(width: 500, color: Colors.deepPurple[600]),

            // 3rd box
            Container(width: 650, color: Colors.deepPurple[300]),
          ],
        ),
         */

        /** like forEach or map of list
         *  
        body: ListView.builder(
          itemCount: names.length,
          itemBuilder: (context, index) => ListTile(title: Text(names[index])),
        ),
         */

        /** GRIDView how to make display: grid
         * 
        body: GridView.builder(
          itemCount: 64,
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 4,
          ),
          itemBuilder: (context, index) =>
              Container(color: Colors.deepPurple, margin: EdgeInsets.all(2)),
        ),
        */

        /**STACK view LIFO like widgets on top of each other
         * 
        body: Stack(
          alignment: Alignment.bottomRight,
          children: [
            // big box
            Container(height: 300, width: 300, color: Colors.deepPurple),

            // medium box
            Container(height: 200, width: 200, color: Colors.deepPurple[400]),

            // small box
            Container(height: 100, width: 100, color: Colors.deepPurple[200]),
          ],
        ),
        */
        body: Center(
          child: GestureDetector(
            // onTap: () {
            //   // do something user tapped the container, like onClick
            //   print('hello world@@@')
            // },
            onTap: userTapped,
            child: Container(
              height: 200,
              width: 200,
              color: Colors.deepPurple[300],
              child: Center(
                child: Text("Tap me!!!", style: TextStyle(color: Colors.white)),
              ),
            ),
          ),
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
