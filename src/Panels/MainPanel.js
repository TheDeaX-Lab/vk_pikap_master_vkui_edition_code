import React from "react";
import { Component } from "react";
import SettingsIcon from "@vkontakte/icons/dist/24/settings";
import SearchIcon from "@vkontakte/icons/dist/24/search";
import CancelIcon from "@vkontakte/icons/dist/24/cancel";
import {
  Panel,
  PanelHeader,
  Group,
  HeaderButton,
  CellButton,
  Cell,
  List,
  Avatar
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

class App extends Component {
  render() {
    return (
      <Panel id="main">
        <PanelHeader
          left={
            !this.props.is_loading && (
              <HeaderButton onClick={() => this.props.onSettings()}>
                <SettingsIcon />
              </HeaderButton>
            )
          }
        >
          Тест людей 2.0
        </PanelHeader>
        {!this.props.is_loading && (
          <Group title="Список действий">
            <CellButton
              before={<SearchIcon />}
              onClick={() => this.props.onSearch()}
            >
              Начать поиск
            </CellButton>
            <CellButton
              before={<CancelIcon />}
              onClick={() => this.props.onClear()}
              level="danger"
            >
              Очистить список
            </CellButton>
          </Group>
        )}
        {this.props.filteredUsers.length > 0 && (
          <Group title="Результат поиска">
            <List>
              {this.props.filteredUsers.map(r => (
                <Cell
                  key={r.id}
                  description={`${r.age} лет`}
                  before={<Avatar size={72} src={r.photo_200} type="image" />}
                  onClick={() => this.props.onProfile(r)}
                >
                  {r.first_name} {r.last_name}
                </Cell>
              ))}
            </List>
          </Group>
        )}
      </Panel>
    );
  }
}

export default App;
