import React from "react";
import { Component } from "react";
import {
  Panel,
  PanelHeader,
  Group,
  Div,
  Cell,
  Avatar,
  List
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Panel id="about">
        <PanelHeader>О сервисе</PanelHeader>
        <Group title="Описание">
          <Div>
            Сервис знакомств или насмешки над людьми, называйте как хотите, в
            него заложен гибкий поиск людей по разным параметрам и фильтр. Он
            будет обновляться каждую неделю, о нововведениях будем описывать вам
            здесь в группе
          </Div>
        </Group>
        <Group title="Участники разработки">
          <List>
            <Cell
              before={
                <Avatar src="https://sun1-83.userapi.com/c850632/v850632026/162203/6xhUuiuPuUQ.jpg?ava=1" />
              }
              description="Разработчик."
              href="https://vk.com/aleksandr_h2001"
              target="_blank"
            >
              Александр Харитонов
            </Cell>
            <Cell
              before={
                <Avatar src="https://sun9-51.userapi.com/c631223/v631223333/40e58/Hz_LNIcq6vc.jpg?ava=1" />
              }
              description="Дизайнер"
              href="https://vk.com/trup1199"
              target="_blank"
            >
              Владислав Кучинов
            </Cell>
            <Cell
              before={
                <Avatar src="https://sun1-24.userapi.com/c855420/v855420624/10b28d/qYXihoRVJEY.jpg?ava=1" />
              }
              description="Создатель фраз для полей"
              href="https://vk.com/lapchanyn"
              target="_blank"
            >
              Данил Попов
            </Cell>
            <Cell
              before={
                <Avatar src="https://sun9-37.userapi.com/c854128/v854128535/147e0b/JBgD8Zenx-k.jpg?ava=1" />
              }
              description="Планировщик"
              href="https://vk.com/c_e_b_e_p"
              target="_blank"
            >
              Максим Герасимов
            </Cell>
            <Cell
              before={
                <Avatar src="https://sun1-90.userapi.com/c631321/v631321621/3a103/mUfP9r4RKMI.jpg?ava=1" />
              }
              description="Тестировщик"
              href="https://vk.com/id256471621"
              target="_blank"
            >
              Дмитрий Лыгин
            </Cell>
            <Cell
              before={
                <Avatar src="https://sun9-49.userapi.com/c847122/v847122325/62c78/hEdCX5iz1M4.jpg?ava=1" />
              }
              description="Идейный вдохновитель"
              href="https://vk.com/p_klight"
              target="_blank"
            >
              Павел Пчёлкин
            </Cell>
          </List>
        </Group>
      </Panel>
    );
  }
}

export default App;
