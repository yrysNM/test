import 'package:hive_flutter/hive_flutter.dart';

class TodoDataBase {
  List todoList = [
    ['Flutter course', false],
    ['Gym', true],
  ];

  final _myBox = Hive.box("mybox");

  void createInititalData() {
    todoList = [
      ["Flutter course", false],
      ["Gym", true],
    ];
  }

  void loadData() {
    todoList = _myBox.get('TODOLIST');
  }

  void updateDataBase() {
    _myBox.put("TODOLIST", todoList);
  }
}
