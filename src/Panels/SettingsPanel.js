import React from "react";
import { Component } from "react";
import {
  Panel,
  PanelHeader,
  Group,
  RangeSlider,
  Select,
  FormStatus,
  Input,
  FormLayout,
  FormLayoutGroup
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sexs: [
        { id: 0, title: "Любой" },
        { id: 1, title: "Женский" },
        { id: 2, title: "Мужской" }
      ],
      statuses: [
        { id: 1, title: "Не женат" },
        { id: 2, title: "Встречается" },
        { id: 3, title: "Помолвлен(-а)" },
        { id: 4, title: "Женат (замужем)" },
        { id: 5, title: "Всё сложно" },
        { id: 6, title: "В активном поиске" },
        { id: 7, title: "Влюблен(-а)" },
        { id: 8, title: "В гражданском браке" }
      ],
      has_photos: [
        { id: 0, title: "Без разницы" },
        { id: 1, title: "Требуется" }
      ]
    };
  }
  render() {
    const {
      onCityUpdate,
      onCountryUpdate,
      onSexUpdate,
      onYearUpdate,
      onStatusUpdate,
      onRangeDateUpdate,
      onHasPhotoUpdate,
      onQUpdate,
      countrys,
      cities,
      has_photos,
      from_year,
      to_year,
      city,
      country,
      sex,
      sexs,
      statuses,
      status,
      q,
      has_photo,
      rangeDate
    } = { ...this.props, ...this.state };
    return (
      <Panel id="settings">
        <PanelHeader>Настройки поиска</PanelHeader>
        <Group title="Настройка параметров для запроса данных">
          <FormLayout>
            <Input
              type="text"
              defaultValue={q}
              onChange={e => onQUpdate(e.target.value)}
              top="Введите имя или фамилию(Только для продвинутых пользователей)"
            />
            <RangeSlider
              min={0}
              max={100}
              step={1}
              top={`Возраст от ${from_year} до ${to_year}`}
              defaultValue={[Number(from_year), Number(to_year)]}
              onChange={r => onYearUpdate(r)}
            />
            <Select
              placeholder="Выберите страну"
              top="Выбор страны"
              value={country}
              onChange={e => onCountryUpdate(e.target.value)}
            >
              {countrys.map(r => (
                <option key={r.id} value={r.id}>
                  {r.title}
                </option>
              ))}
            </Select>

            {!!country && (
              <Select
                top="Выбор города"
                placeholder="Выберите город"
                value={city}
                onChange={e => onCityUpdate(e.target.value)}
              >
                {cities.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.title}
                  </option>
                ))}
              </Select>
            )}
            <Select
              placeholder="Выберите пол"
              top="Выбор пола"
              value={sex}
              onChange={e => onSexUpdate(e.target.value)}
            >
              {sexs.map(r => (
                <option key={r.id} value={r.id}>
                  {r.title}
                </option>
              ))}
            </Select>
            <Select
              top="Выбор статуса"
              placeholder="Выберите статус"
              value={status}
              onChange={e => onStatusUpdate(e.target.value)}
            >
              {statuses.map(r => (
                <option key={r.id} value={r.id}>
                  {r.title}
                </option>
              ))}
            </Select>
            <Select
              top="Выбор наличия фото"
              placeholder="Выберите требование наличия фото"
              value={has_photo}
              onChange={e => onHasPhotoUpdate(e.target.value)}
            >
              {has_photos.map(r => (
                <option key={r.id} value={r.id}>
                  {r.title}
                </option>
              ))}
            </Select>
          </FormLayout>
        </Group>
        <Group title="Параметры фильтра">
          <FormLayout>
            <FormLayoutGroup top="Временной диапозон онлайна">
              <Input
                type="text"
                defaultValue={`${rangeDate[0]}-${rangeDate[1]}`}
                onChange={e => {
                  onRangeDateUpdate(
                    e.target.value.split("-").map(r => parseInt(r))
                  );
                }}
                top="Количество секунд"
              />
              <FormStatus>
                Инструкция использования данного поля. Он принимает
                исключительно целочисленные значения в секундах. Напомню, вк
                обновляет онлайн каждые 5 минут тоесть гибкость в милисекундах
                выражать смысла нет, только в секундах.
                <br /> Перейдем к формату: (от секунд)-(до секунд)
                <br /> Например если нам нужно найти человека который будет
                находиться онлайн не позже чем 1 день:
                <br /> 0-86400
              </FormStatus>
            </FormLayoutGroup>
          </FormLayout>
        </Group>
      </Panel>
    );
  }
}

export default App;
