import {useCallback} from 'react';
import {AccountBookHistory} from '../data/AccountBookHistory';
import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';

SQLite.enablePromise(true);
SQLite.DEBUG(true);

export const useAccountBookHistoryItem = () => {
  const openDB = useCallback<() => Promise<SQLiteDatabase>>(async () => {
    const db = await SQLite.openDatabase(
      {
        name: 'account_history',
        createFromLocation: '~www/account_history.db',
        // createFromLocation: 1,
        location: 'default',
      },
      () => {
        console.log('open success');
      },
      () => {
        console.log('open failure');
      },
    );

    // 테이블이 없으면 생성 (최초 1회)
    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS account_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT,
        price INTEGER,
        comment TEXT,
        date INTEGER,
        photo_url TEXT,
        created_at INTEGER,
        updated_at INTEGER
      )
    `);

    // 기존 데이터 중 date가 0인 경우 created_at으로 채워서
    // 차트/리스트에서 모두 동일한 기준 날짜를 보도록 마이그레이션
    await db.executeSql(`
      UPDATE account_history
      SET date = created_at
      WHERE date IS NULL OR date = 0
    `);

    return db;
  }, []);
  return {
    insertItem: useCallback<
      (item: Omit<AccountBookHistory, 'id'>) => Promise<AccountBookHistory>
    >(
      async item => {
        const db = await openDB();
        const now = new Date().getTime();
        const dateValue = item.date !== 0 ? item.date : now;
        const result = await db.executeSql(
          `
				  INSERT INTO account_history (type, price, comment, date, photo_url, created_at, updated_at)
				  VALUES ( 
					  "${item.type}",
					  ${item.price},
					  "${item.comment}",
					  ${dateValue},
					  ${item.photoUrl !== null ? `"${item.photoUrl}"` : null},
					  ${now},
					  ${now}
				  )
			  `,
        );

        console.log(result);

        return {
          ...item,
          id: result[0].insertId,
        };
      },
      [openDB],
    ),
    getList: useCallback<() => Promise<AccountBookHistory[]>>(async () => {
      const db = await openDB();
      const result = await db.executeSql('SELECT * FROM account_history');
      const items: AccountBookHistory[] = [];
      const size = result[0].rows.length;

      for (let i = 0; i < size; i++) {
        const item = result[0].rows.item(i);

        items.push({
          type: item.type,
          comment: item.comment,
          createdAt: parseInt(item.created_at),
          updatedAt: parseInt(item.updated_at),
          date: parseInt(item.date),
          id: parseInt(item.id),
          photoUrl: item.photo_url,
          price: parseInt(item.price),
        });
      }

      // createdAt 기준으로 최신순 정렬 (date가 0인 경우도 포함)
      return items.sort((a, b) => b.createdAt - a.createdAt);
    }, [openDB]),
    updateItem: useCallback<
      (item: AccountBookHistory) => Promise<AccountBookHistory>
    >(
      async item => {
        if (typeof item.id === 'undefined') {
          throw Error('unexpected id value');
        }

        const db = await openDB();

        const now = new Date().getTime();

        const result = await db.executeSql(
          `
			  UPDATE account_history
			  SET price=${item.price},
				  comment="${item.comment}",
				  date=${item.date},
				  photo_url=${item.photoUrl !== null ? `"${item.photoUrl}"` : null},
				  updated_at=${now},
				  date=${item.date}
			  WHERE id=${item.id}
		  `,
        );

        return {
          ...item,
          id: result[0].insertId,
        };
      },
      [openDB],
    ),
    deleteItem: useCallback<(id: number) => Promise<void>>(
      async id => {
        const db = await openDB();
        await db.executeSql('DELETE FROM account_history WHERE id = ?', [id]);
      },
      [openDB],
    ),
  };
};
