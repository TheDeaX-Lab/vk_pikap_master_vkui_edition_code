import React from "react";
import { Component } from "react";

import BackIcon from "@vkontakte/icons/dist/24/back";
import {
  Panel,
  PanelHeader,
  Group,
  Select,
  FormStatus,
  Input,
  HeaderButton,
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
      ],
      Neededs: [
        { id: 0, title: "Не учитывать" },
        { id: 1, title: "Учитывать" }
      ],
      blacklisteds: [
        { id: 0, title: "Не находишься у него в списке" },
        { id: 1, title: "Находишься у него в списке" }
      ],
      blacklisted_by_mes: [
        { id: 0, title: "Не находится в твоем черном списке" },
        { id: 1, title: "Находится в твоем черном списке" }
      ],
      can_send_friend_requests: [
        { id: 0, title: "Ты не можешь кинуть заявку в друзья" },
        { id: 1, title: "Ты можешь кинуть заявку в друзья" }
      ],
      can_write_private_messages: [
        { id: 0, title: "Ты не можешь писать ему в личные сообщения" },
        { id: 1, title: "Ты можешь писать ему в личные сообщения" }
      ],
      is_closeds: [
        { id: 0, title: "Страница не закрыта" },
        { id: 1, title: "Страница закрыта" }
      ]
    };
  }

  getSelect(title, needed, callback_needed, status, callback_status, statuses) {
    return (
      <FormLayoutGroup top={title}>
        <Select
          value={needed}
          onChange={e => {
            callback_needed(parseInt(e.target.value));
          }}
        >
          {this.state.Neededs.map(r => (
            <option key={r.id} value={r.id}>
              {r.title}
            </option>
          ))}
        </Select>
        {!!needed && (
          <Select
            value={status}
            onChange={e => {
              callback_status(parseInt(e.target.value));
            }}
          >
            {statuses.map(r => (
              <option key={r.id} value={r.id}>
                {r.title}
              </option>
            ))}
          </Select>
        )}
      </FormLayoutGroup>
    );
  }

  render() {
    const {
      onCityUpdate,
      onCountryUpdate,
      onSexUpdate,
      onFromYearUpdate,
      onToYearUpdate,
      onStatusUpdate,
      onRangeDateUpdate,
      onHasPhotoUpdate,
      onDateNeededUpdate,
      onBlacklistedByMeUpdate,
      onBlacklistedUpdate,
      onCanSendFriendRequestUpdate,
      onCanWritePrivateMessageUpdate,
      onIsClosedUpdate,
      onBlacklistedByMeNeededUpdate,
      onBlacklistedNeededUpdate,
      onCanSendFriendRequestNeededUpdate,
      onCanWritePrivateMessageNeededUpdate,
      onIsClosedNeededUpdate,
      onQUpdate,
      onBack,
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
      blacklisted_by_me,
      blacklisted,
      can_send_friend_request,
      can_write_private_message,
      is_closed,
      rangeDate,
      blacklisted_needed,
      blacklisted_by_me_needed,
      can_send_friend_request_needed,
      can_write_private_message_needed,
      is_closed_needed,
      dateNeeded
    } = { ...this.props, ...this.state };
    return (
      <Panel id="settings">
        <PanelHeader
          left={
            <HeaderButton onClick={() => onBack()}>
              <BackIcon />
            </HeaderButton>
          }
        >
          Фильтр поиска
        </PanelHeader>
        <Group title="Параметры фильтра для запроса данных">
          <FormLayout>
            <Input
              type="text"
              defaultValue={q}
              onChange={e => onQUpdate(e.target.value)}
              top="Введите имя или фамилию(Только для продвинутых пользователей)"
            />
            <FormLayoutGroup
              top={`Выбор возраста от ${from_year} до ${to_year}`}
            >
              <Select
                top={`Выбор возраста от ${from_year} до ${to_year}`}
                value={from_year}
                onChange={e => onFromYearUpdate(parseInt(e.target.value))}
              >
                {Array.from(Array(to_year).keys()).map(r => (
                  <option value={r} key={r}>
                    {r} лет
                  </option>
                ))}
              </Select>
              <Select
                value={to_year}
                onChange={e => onToYearUpdate(parseInt(e.target.value))}
              >
                {Array.from(Array(100 - from_year).keys())
                  .map(r => r + from_year + 1)
                  .map(r => (
                    <option value={r} key={r}>
                      {r} лет
                    </option>
                  ))}
              </Select>
            </FormLayoutGroup>
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
        <Group title="Параметры дополнительного фильтра">
          <FormLayout>
            <FormLayoutGroup top="Временной диапазон онлайна">
              <Select
                value={dateNeeded}
                onChange={e => {
                  onDateNeededUpdate(!!parseInt(e.target.value));
                }}
              >
                {this.state.Neededs.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.title}
                  </option>
                ))}
              </Select>
              {!!dateNeeded && (
                <>
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
                    обновляет онлайн каждые 5 минут тоесть гибкость в
                    милисекундах выражать смысла нет, только в секундах.
                    <br /> Перейдем к формату: (от секунд)-(до секунд)
                    <br /> Например если нам нужно найти человека который будет
                    находиться онлайн не позже чем 1 день:
                    <br /> 0-86400
                  </FormStatus>
                </>
              )}
            </FormLayoutGroup>
            {this.getSelect(
              "Наличие тебя в его черном списке",
              blacklisted_needed,
              onBlacklistedNeededUpdate,
              blacklisted,
              onBlacklistedUpdate,
              this.state.blacklisteds
            )}
            {this.getSelect(
              "Наличие его в твоем черном списке",
              blacklisted_by_me_needed,
              onBlacklistedByMeNeededUpdate,
              blacklisted_by_me,
              onBlacklistedByMeUpdate,
              this.state.blacklisted_by_mes
            )}
            {this.getSelect(
              "Возможность писать ему личные сообщения",
              can_write_private_message_needed,
              onCanWritePrivateMessageNeededUpdate,
              can_write_private_message,
              onCanWritePrivateMessageUpdate,
              this.state.can_write_private_messages
            )}
            {this.getSelect(
              "Возможность добавить его в друзья",
              can_send_friend_request_needed,
              onCanSendFriendRequestNeededUpdate,
              can_send_friend_request,
              onCanSendFriendRequestUpdate,
              this.state.can_send_friend_requests
            )}
            {this.getSelect(
              "Закрытость страницы",
              is_closed_needed,
              onIsClosedNeededUpdate,
              is_closed,
              onIsClosedUpdate,
              this.state.is_closeds
            )}
          </FormLayout>
        </Group>
      </Panel>
    );
  }
}

export default App;
