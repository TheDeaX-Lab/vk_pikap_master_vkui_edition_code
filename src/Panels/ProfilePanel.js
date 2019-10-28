import React from "react";
import { Component } from "react";
import BackIcon from "@vkontakte/icons/dist/24/back";
import {
  Panel,
  PanelHeader,
  Group,
  HeaderButton,
  Div,
  Cell,
  InfoRow,
  List,
  Avatar
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
class App extends Component {
  render() {
    const { timesBefore } = this.props.profile;
    return (
      <Panel id="profile">
        <PanelHeader
          left={
            <HeaderButton onClick={() => this.props.onBack()}>
              <BackIcon />
            </HeaderButton>
          }
        >
          Профиль
        </PanelHeader>
        <Group title="Основная информация">
          <List>
            <Cell
              size="l"
              before={
                <Avatar src={this.props.profile.photo_200} type="image" />
              }
              href={`https://vk.com/id${this.props.profile.id}`}
              description={
                "Была " +
                (timesBefore[3] > 0 ? `${timesBefore[3]} дней ` : "") +
                (timesBefore[2] > 0 ? `${timesBefore[2]} часов ` : "") +
                (timesBefore[1] > 0 ? `${timesBefore[1]} минут ` : "") +
                (timesBefore[0] > 0 ? `${timesBefore[0]} секунд ` : "") +
                "назад"
              }
            >
              {this.props.profile.first_name} {this.props.profile.last_name}
            </Cell>
            <Div>
              <InfoRow title="Возраст">{this.props.profile.age} лет</InfoRow>
            </Div>
          </List>
        </Group>
        <Group title="Побочная информация">
          <List>
            {[
              ["Тест на Олега:", `${this.props.profile.oleg}%`],
              [
                "Уровень IQ:",
                `${
                  this.props.profile.iq > 50
                    ? "Умпалумпа"
                    : this.props.profile.iq
                }`
              ],
              [
                "Тест на наркотики:",
                `${
                  this.props.profile.drugs > 50
                    ? "Я не торч, просто сладко дунул"
                    : "Я полноценный торч"
                }`
              ],
              [
                "Сохранена девственность:",
                `${this.props.profile.sex_saved > 85 ? "Да" : "Нет"}`
              ],
              [
                "Половых отношений пройдено:",
                `${this.props.profile.sex_completed} ${
                  this.props.profile.sex === 1
                    ? "Парней"
                    : this.props.profile.sex
                    ? "Девушек"
                    : "Инопланетян"
                }`
              ],
              [
                `${
                  this.props.profile.sex === 1
                    ? "Глубина"
                    : this.props.profile.sex === 2
                    ? "Размер"
                    : "Пустота"
                }`,
                `${this.props.profile.size / 10} см`
              ],
              [
                "Тест на кавказца:",
                `${this.props.profile.kavkaz > 30 ? "Отвечаю Вася!" : 0}`
              ],
              [
                "Тест на анимешника:",
                `${
                  this.props.profile.anime > 50
                    ? "Omae Wa Mou Shindeiru"
                    : "Ну что пацаны? Аниме?"
                }`
              ]
            ].map((item, k) => (
              <Cell key={k}>
                <InfoRow title={item[0]}>{item[1]}</InfoRow>
              </Cell>
            ))}
          </List>
        </Group>
      </Panel>
    );
  }
}

export default App;
