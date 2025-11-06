import 'package:flutter/material.dart';

class TodoPage extends StatefulWidget {
  const TodoPage({super.key});

  @override
  State<TodoPage> createState() => _TodoPageState();
}

class _TodoPageState extends State<TodoPage> {
  // text editing controller
  TextEditingController testController = TextEditingController();
  String testString = "";

  void onTapBtn() {
    setState(() {
      testString = "Hello " + testController.text;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            spacing: 12,
            children: [
              Text(testString),

              TextField(
                controller: testController,
                decoration: InputDecoration(
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.all(Radius.circular(12)),
                  ),
                  hintText: "Enter text",
                ),
              ),

              ElevatedButton(onPressed: onTapBtn, child: Text("Tap")),
            ],
          ),
        ),
      ),
    );
  }
}
