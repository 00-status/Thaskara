<?php

/**
 *
 * A relatively simple php class that interacts with a MySQL DB
 *
 * @version 1.0
 * @author Liam J.
 */
class Database
{

    private $connection = null;

    function __construct($server, $user, $pass, $db)
    {
        $this->connection = new mysqli($server, $user, $pass, $db);

        /* check connection */
        if ($this->connection->connect_error) {
            die("Connection failed: " . $this->connection->connect_error);
        }
    }


    /**
     * connects to the MySQL DB
     */
    function connectToDB()
    {
        $this->connection->connect();
    }
    /**
     * Closes the MySQL Connection
     */
    function closeDB()
    {
        $this->connection->close();
    }



    /**
     * Gets all of the entries in the specified table.
     * Returns false if no entries were found, and an array of assoc arrays
     * if some rows were retrieved.
     * @param mixed $table the table to retrieve entries from
     * @return array|boolean
     */
    function selectEntries($table)
    {
        // A variable to hold the result of this method
        $returns = false;
        // An array of returned rows
        $rows = array();

        // Prepare a select statement and execute it
        if ($stmt = $this->connection->prepare("SELECT * FROM `$table` WHERE 1"))
        {
            $stmt->execute();

            // Get the result
            $result = $stmt->get_result();

            // Close the Statement and the DB Connection
            $stmt->close();

            if ($result->num_rows === 0)
            {
                $returns = false;
            }
            else
            {
                // Add the resulting rows to the array of rows
                while ($row = $result->fetch_assoc())
                {
                    array_push($rows, $row);
                }

                // Set the returns variable to the rows
                $returns = $rows;
            }
        }
        else
        {
            echo "statement falied";
        }
        $this->closeDB();

        // Return false if no rows were returned
        // Otherwise return an array of assoc arrays that represent the entries in the table
        return $returns;
    }
}