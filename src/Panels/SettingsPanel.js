import React from "react";
import { Component } from "react";
import BackIcon from "@vkontakte/icons/dist/24/back";
import {
  Panel,
  PanelHeader,
  Group,
  HeaderButton,
  RangeSlider,
  Select,
  Div
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
class App extends Component {
  render() {
    return (
      <Panel id="settings">
        <PanelHeader
          left={
            <HeaderButton onClick={this.props.onBack}>
              <BackIcon />
            </HeaderButton>
          }
        >
          Настройки поиска
        </PanelHeader>
        <Group
          title={`Возраст от ${this.props.from_year} до ${this.props.to_year}`}
        >
          <Div>
            <RangeSlider
              min={0}
              max={100}
              step={1}
              defaultValue={[
                Number(this.props.from_year),
                Number(this.props.to_year)
              ]}
              onChange={r => this.props.onYearUpdate(r)}
            />
          </Div>
        </Group>
        <Group title="Выбор местоположения">
          <Div>
            <Select
              placeholder="Выберите страну"
              value={this.props.country}
              onChange={e => this.props.onCountryUpdate(e.target.value)}
            >
              {this.props.countrys.map(r => (
                <option key={r.id} value={r.id}>
                  {r.title}
                </option>
              ))}
            </Select>
          </Div>

          {!!this.props.country && (
            <Div>
              <Select
                placeholder="Выберите город"
                value={this.props.city}
                onChange={e => this.props.onCityUpdate(e.target.value)}
              >
                {this.props.cities.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.title}
                  </option>
                ))}
              </Select>
            </Div>
          )}
        </Group>
        <Group title="Выбор пола">
          <Div>
            <Select
              placeholder="Выберите пол"
              value={this.props.sex}
              onChange={e => this.props.onSexUpdate(e.target.value)}
            >
              {this.props.sexs.map(r => (
                <option key={r.id} value={r.id}>
                  {r.title}
                </option>
              ))}
            </Select>
          </Div>
        </Group>
      </Panel>
    );
  }
}

export default App;
