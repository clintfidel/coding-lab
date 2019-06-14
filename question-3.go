package model

import (
	"database/sql"
	"time"

	_ "github.com/lib/pq"
)

type Tasks struct {
	ID          int
	Title       string
	Done        bool
	UserID      int
	CreatedAt   time.Time
}

var Db *sql.DB

func main() {
	var err error

	Db, err = sql.Open("postgres", "user=postgres dbname=go_app sslmode=disable")
	if err != nil {
		panic(err)
	}
}

func (task *Tasks) Create() error {
	query := "insert into tasks (title, user_id) values ($1, $2) returning id, done"

	stmt, err := Db.Prepare(query)

	if err != nil {
		panic(err)
	}

	defer stmt.Close()
	err = stmt.QueryRow(task.Title, task.UserID).Scan(&task.ID, &task.Done)

	if err != nil {
		return err
	}

	return task
}