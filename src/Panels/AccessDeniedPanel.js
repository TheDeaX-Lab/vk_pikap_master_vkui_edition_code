import React from "react";
import { Component } from "react";
import AddIcon from "@vkontakte/icons/dist/24/add";
import {
  Panel,
  PanelHeader,
  Group,
  Div,
  CellButton,
  InfoRow
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
class App extends Component {
  render() {
    return (
      <Panel id="denied">
        <PanelHeader>Доступ запрещен!</PanelHeader>
        <Group>
          <Div>
            Чтобы пользоваться нашим сервисом, то нам требуется ваш доступ
          </Div>
          <CellButton before={<AddIcon />} onClick={() => this.props.onBack()}>
            Разрешить доступ
          </CellButton>
        </Group>
        <Group title="Мини FAQ">
          <Div>
            <InfoRow title="Зачем вам нужен доступ к моему аккаунту?">
              Нам нужен доступ для того чтобы производить поиск с вашего
              аккаунта, а не с чужого, у которого возможно другие параметры
              поиска и совсем иной черный список. Также нужен для автодополнения
              вашего противоположного пола, страны и города
            </InfoRow>
          </Div>
          <Div>
            <InfoRow title="А вдруг вы меня взломаете?">
              Нет, сервис запрашивает от вас лишь определенные права, в данном
              случае мы используем только вашу основную информацию и список
              друзей.
            </InfoRow>
          </Div>
        </Group>
      </Panel>
    );
  }
}

export default App;
