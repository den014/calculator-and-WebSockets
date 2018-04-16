/*
  Как это работает.
  У нас есть пустой массив comments. При добавлении задачи, отрабатывается функция
  removeComment(id), которая принимает один аргумент - id текущего комментария.
  Если функция была вызвана впервые, в массиве появится новый объект с двумя ключами:
  id - идентификатор текущей задачи;
  inProcess - ключ, говорящий о том, выполняется ли задача в данный момент,
  (если функция была вызвана впервые, ключ будет true и сразу произойдет socket.send).

  Когда мы получили ответ в вотчере 'message', мы удаляем выполненный объект из массива и
  проверяем его на пустоту.

  В случае если в массиве comments у нас есть еще объекты, они поочередно будут выполняться,
  пока массив не будет пустым.

  Если у нас случились проблемы с соединением, элементы будут добавляться в массив и при
  соединении, поочередно выполнятся.
*/

export const socket = new WebSocket('ws://echo.websocket.org/');
let comments = [];

// Проверка массива на пустоту
const isCommentsArrayNotEmpty = () => comments.length !== 0;

// Проверка, есть ли в массиве запущенный процесс
const inProcess = () =>
	comments.map(comment => comment.inProcess === true).find(c => c !== null);

// Проверка, есть ли уже данный элемент в массиве
const isInArray = id =>
	comments.map(comment => comment.id === id).find(c => c !== false);

export const removeComment = (id) => {
	/*
    Проверяем соединение. Если мы не смогли достучаться, пушаем id комментария в массив
    (если его нет) и завершаем выполнение функции. (задачи отработаются в вотчере 'open',
    при соединении)
 */
	if (socket.readyState !== WebSocket.OPEN) {
		if (!isInArray(id)) {
			comments.push(id);
		}
		return;
	}

	// Проверяем есть ли в массиве очередь
	if (isCommentsArrayNotEmpty()) {
		// Если элемента нет в массиве - добавляем
		if (!isInArray(id)) {
			comments.push({
				id,
				inProcess: false,
			});
		}

		// Если нет запущенных процессов, запускаем первый в массиве, отправляем его и завершаем функцию
		if (!inProcess()) {
			comments[0] = {
				...comments[0],
				inProcess: true,
			};

			socket.send(comments[0].id);
		}
		return;
	}

	// Есои массив пуст, пушаем в массив новый элемент с ключем inProcess - true и отправляем
	comments.push({
		id,
		inProcess: true,
	});

	socket.send(id);
};

// Если в массиве есть объекты, запускаем процесс
const startRemoveProcess = () => {
	if (isCommentsArrayNotEmpty()) {
		removeComment(comments[0].id);
	}
};

// По отрабатыванию вотчера 'message', удаляем очищаем массив от отработоннго элемента
export const removeFromArray = (id) => {
	comments = comments.filter(comment => comment.id !== id);

	startRemoveProcess();
};

// Если в массиве появились элементы до соединения, отрабатываем их
socket.addEventListener('open', () => {
	startRemoveProcess();
});

// Ловим ошибки
socket.addEventListener('error', (error) => {
	throw new Error(error.message);
});

