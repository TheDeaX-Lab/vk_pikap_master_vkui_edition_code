import React from "react";
import { Component } from "react";
import {
  Panel,
  PanelHeader,
  Group,
  Div,
  Cell,
  Avatar,
  List,
  InfoRow
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import version from "../version.txt";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      version: 0,
      slideIndex: 0,
      image_urls: [
        "https://psv4.userapi.com/c848032/u258201990/docs/d7/cbd9cbf29dca/GRAF_1572422952946.png?extra=9uUK0AuTp-fHN2Aj3w0uA45fh51mqn3FUD7OV2HBuYShkA1Z0T-IlQQOr13RVbJsYq0SVHCikKGmJYfwrphhrROuljsZZj4BdObdCE7pyhqwJS3aJ11DhrYwYP7sZUx6S98g5ztag2ufeUy53vvg_UTh",
        "https://psv4.userapi.com/c856332/u258201990/docs/d13/41cc09c73ac2/GRAF_1572423071731.png?extra=3fLhAP22vRw48lEVnv7U8Dq-M_4JcWyfNdnxBa7fz4DCAU_1Tz93ymdU_uwi89_BiAgTad4pgfQ8_taKXaf0SOxGiY0GrL5z9oiDClTzDm3qw91v10WHNahj2q25NmbTFA83jFLkU8XVnANTHr4jyWx3",
        "https://psv4.userapi.com/c856324/u258201990/docs/d4/0bdf9e0ccfaf/GRAF_1572431638821.png?extra=ZZHOufOoqqXIhO3F0wtUpLyM2XALQO3Llq_nlmlb3StIQynCGKC-GAA7KO9tJUR8LVVIYAJImzz_Nlu4XBa_tk0Go_RkTwhitN_IZskdC4Imj_WrEuXczXejR7KxnPe0xl8NdASCYmFQd3tbUy7CjQ2N",
        "https://psv4.userapi.com/c848236/u258201990/docs/d18/e50108c5f954/GRAF_1572431959018.png?extra=lY3RqADzSzDRmI0lNo0x-X1WSbuUEt5vVwSaT5FK6ooG6h-vztXYPDl-Vs2d7oI6Or2PhKCJm5cboSpxD8nhEyP7faikfeJV0GQYrxUY6ngB-6gFBBUTuO2JHMgBEmAKRw0Kf52jJtRVV2_xp-Z9RAnH"
      ]
    };
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
              description="Разработчик"
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
        <Group title="Технические данные сервиса">
          <Cell>
            <InfoRow title="Версия приложения">
              0.1v Build {this.state.version}
            </InfoRow>
          </Cell>
        </Group>
      </Panel>
    );
  }
  componentDidMount() {
    fetch(version)
      .then(r => r.text())
      .then(r => this.setState({ version: parseInt(r) }))
      .catch(() => alert("Приложение было обновлено, пожалуйста очистите кеш"));
  }
}

export default App;
