import React from "react";
import { Component } from "react";
import SearchIcon from "@vkontakte/icons/dist/24/search";
import SettingsIcon from "@vkontakte/icons/dist/24/filter";
import CancelIcon from "@vkontakte/icons/dist/24/cancel";
import PayIcon from "@vkontakte/icons/dist/24/money_transfer";
import UpIcon from "@vkontakte/icons/dist/24/up";
import Icon24Advertising from "@vkontakte/icons/dist/24/advertising";
import vkConnect from "@vkontakte/vk-connect";
import {
  Panel,
  PanelHeader,
  Group,
  Cell,
  List,
  Avatar,
  Button,
  Div,
  HeaderButton
} from "@vkontakte/vkui";

import "@vkontakte/vkui/dist/vkui.css";
const app_id = 7185084;
class App extends Component {
  render() {
    return (
      <Panel id="main">
        <PanelHeader
          left={
            <HeaderButton onClick={() => window.scroll(0, 0)}>
              <UpIcon />
            </HeaderButton>
          }
        >
          Поисковая система 2.0
        </PanelHeader>
        {!this.props.is_loading && (
          <>
            <Group title="Список действий">
              <Div style={{ display: "flex" }}>
                <Button
                  size="l"
                  stretched
                  before={<SettingsIcon />}
                  onClick={() => this.props.toSettings()}
                  level="primary"
                  style={{ marginRight: 8 }}
                >
                  Фильтр
                </Button>
                <Button
                  size="l"
                  stretched
                  style={
                    this.props.filteredUsers.length !== 0
                      ? { marginRight: 8 }
                      : {}
                  }
                  before={<SearchIcon />}
                  level="secondary"
                  onClick={() => this.props.onSearch()}
                >
                  Поиск
                </Button>
                {this.props.filteredUsers.length !== 0 && (
                  <Button
                    size="l"
                    stretched
                    before={<CancelIcon />}
                    onClick={() => this.props.onClear()}
                    level="destructive"
                  >
                    Очистить
                  </Button>
                )}
              </Div>
            </Group>
            <Group title="Поддержание проекта">
              <Div>
                <Button
                  level="commerce"
                  size="xl"
                  before={<PayIcon />}
                  onClick={() =>
                    vkConnect.send("VKWebAppOpenPayForm", {
                      app_id,
                      action: "transfer-to-user",
                      params: { user_id: 258201990 }
                    })
                  }
                >
                  Поддержать проект
                </Button>
              </Div>

              <Div>
                <Button
                  level="commerce"
                  size="xl"
                  before={<Icon24Advertising />}
                  onClick={() => this.props.publicationStory()}
                >
                  Принять участие в рекламе
                </Button>
              </Div>
            </Group>
          </>
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
