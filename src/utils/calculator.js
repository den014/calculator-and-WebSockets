/*
  Как это работает.
  При любом добавлении числа или символа, мы обращаемся к default функции,
  которая принимает два аргумента:

  fractions - массив из объектов всех дробных выражений.
  Каждый объект имеет структуру
  {id: идентификатор, top: верхнее значение, bottom: нижнее значение}

  operators - массив из объектов всех введенных операторов, имеет структуру:
  {id: идентификатор, value: значение}

  Сначала мы фильруем операторы по важности, то есть в первом массиве мы храним
  умножение и деление,во втором - плюс/минус.

  Далее мы создаем оригинальную копию fractions, под названием 'result' и все последующие
  манипуляции проводим с ней.

  Скрещиваем массивы с операторами по важности и в цикле пересчитываем
  все значения, вложенной функцией recountValues(index, operator).

  recountValues - принимает два аргумента - идентификатор второго
  дробного выражения и оператор.

  Что делает эта функция - по идентификатору, она находит индекс 1го и 2го текущих
  дробных выражений и выполняет математически расчет между ними.
  Далее она записывает результат в result, в объект второго дробного выражения,
  а так же добавляем к его идентификатору, идентификатор первого
  дробного выражения, после чего первое дробное выражение убираем из массива.

  В итоге у нас должен остаться один объект, который будет иметь в себе
  все идентификаторы и правильный расчет.

  После того, как расчет завершился, мы запускаем функцию roundOffResult,
  которая проверяет и преобразовывает дробь в несократимую, путем перебора
  поделить выражение на числа от 2 до 9.
  В случае если удалось сократить дробь, цикл прервется и функция будет
  повторно вызываться, пока не пройдет по всему циклу (2-9) до конца.
*/

// Получение результата вычисления
const getResult = (firstValue, secondValue, operator) => {
	// На всякий случай преобразовываем аргументы с числами в тип Number
	const first = Number(firstValue);
	const second = Number(secondValue);

	switch (operator) {
		case '+':
			return first + second;
		case '-':
			return first - second;
		case '*':
			return first * second;
		case '/':
			return first / second;
		default:
			return 0; // Никогда не должен сюда заходить, в противном случае функция бессмысленна
	}
};

// Проверка на не польность введенных пользователем данных
const checkResult = (result) => {
	// Проверяем есть ли все значения у результата
	const isNotEmptyValue = result[0].top !== 0 && result[0].bottom !== 0;
	// Проверяем получили ли мы полный результат, где должен остаться один объект
	const isfullResult = !result[1];

	/*
    Данные проверки необходимы, потому что вычисление происходит в real time
    и в момент когда пользователь ввел только половину выражения, могут упасть разного рода ошибки
  */

	return isNotEmptyValue && isfullResult; // Возвращаем результат
};

const isInteger = num => num % 1 === 0; // Проверка на то, является ли число целым

// Функция для преобразования дроби в несократимую. Аргументом принимает результат выполнения.
const roundOffResult = async result =>
	new Promise(async (resolve) => {
		try {
			// Создаем массив с числами, на которое может быть деление
			const numbers = [2, 3, 4, 5, 6, 7, 8, 9];
			const { top, bottom } = result; // Деструктуризируем и достаем значения
			let r = result; // Создаем копию результата
			let success = 0; // Создаем счестчик

			/*
        Пробегаем по всем числам, на которое может быть деление и
        в случае удачи, производим сокращение чисел.
        В случае если цикл не был полностью завершен (узнаем по счетчику),
        запускаем функцию повторно до тех пор, пока цикл не будет пройден полностью.
     */
			for (const number of numbers) {
				// Проверяем делятся ли значения на текущее число
				if (isInteger(top / number) && isInteger(bottom / number)) {
					// Делим числа и записываем новые значения
					r = {
						top: top / number,
						bottom: bottom / number,
					};
					break; // Останавливаем цикл
				}
				success++; // Увеличиваем счетчик, если цикл не был прерван
			}

			if (numbers.length !== success) { // Проверяем равен ли счетик, величине массива с чилами
				resolve(await roundOffResult(r)); // Запускаем функцию повторно
			} else {
				resolve(r); // Отдаем результат
			}
		} catch (error) {
			/*
        Если есть дополнительные кейсы для возможности сломать калькулятор,
        кроме указанных в функции checkResult(), отлавливаем их здесь.
     */
			throw new Error(error);
		}
	});

// Калькулятор
export default async (fractions, operators) => {
	const priorityOperators = operators.filter(o => o.value === '*' || o.value === '/'); // Фильтруем приоритетные операторы
	const notPriorityOperators = operators.filter(o => o.value === '+' || o.value === '-'); // Фильтруем обычные операторы
	let result = JSON.parse(JSON.stringify(fractions)); // Создаем оригинальную копию всех чисел

	/*
    Функция для пересчета определенной пары дробных чисел.
    Принимает два аргумента - идентификатор второго дробного выражения и оператор.
    При пересчете выражения, удаляет из массива первое дробное выражение,
    добавляет его идентификатор во второе дробное выражение, а так же новый результат вычисления
  */
	const recountValues = (fractionId = 0, operator) => {
		// Находим индекс нужного дробного выражения
		const currentIndex = result
			.map((r, fId) => (r.id.find(i => i === fractionId) ? fId : null))
			.find(f => f !== null); // Очищаем массив от null
		// Деструктуризируем и достаем значения первого дробного выражения из массива по индексу
		const { id: prevId, top: prevTop, bottom: prevBottom } = result[currentIndex - 1];
		// Деструктуризируем и достаем значения второго дробного выражения из массива по индексу
		const { id, top, bottom } = result[currentIndex];

		// Сохраняем новые значения
		result[currentIndex] = {
			id: id.concat(prevId), // Добавляем идентификаторы первого дробного выражения
			top: getResult(prevTop, top, operator), // Пересчитываем результат верхнего значения
			bottom: getResult(prevBottom, bottom, operator), // Пересчитываем результат нижнего значения
		};
		result = result.filter(f => f.id !== prevId); // Вытаскиваем из массива первое дробное выражение
	};

	/*
    Скрещиваем приоритетные и не приоритетные операторы в нужном порядке и в цикле производим
    пересчет.
    При получении полных данных, в массиве должен остаться один объект, с правильным результатом
    пересчета выражений.
  */
	priorityOperators.concat(notPriorityOperators).map(o => recountValues(o.id, o.value));

	// Создаем default пустой результат
	let newResult = {
		top: '',
		bottom: '',
	};

	// Проверяем полность и правильность данных
	if (checkResult(result)) {
		/*
      Если результат прошел проверку, преобразовываем дробь в несократимую
      и перезаписываем переменную
    */
		newResult = await roundOffResult(result[0]);
	}

	return newResult; // Отдаем результат
};
