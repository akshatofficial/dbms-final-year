import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, CircularProgress } from "@mui/material";
import { DeleteApplicationTest } from "../api";
import { useNavigate } from "react-router-dom";

export default function DataTable({
  columns,
  rows,
  deleteMethod,
  nextMethod,
  openEditForm,
  setOpenEditForm,
  ...props
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [deleteId, setDeleteId] = React.useState(null);
  const [deleteLoader, setDeleteLoader] = React.useState(false);
  const handleDelete = async (id) => {
    // console.log(deleteId);
    setDeleteLoader(true);

    setTimeout(async () => {
      try {
        const formData = { id };
        await deleteMethod(formData);
        nextMethod();
      } catch (e) {
        console.log(e);
      } finally {
        setDeleteLoader(false);
      }
    }, 2000);
  };

  const [editData, setEditData] = React.useState(null);
  const [editLoader, setEditLoader] = React.useState(false);
  const navigate = useNavigate();
  const handleEdit = async (data) => {
    setEditLoader(true);

    console.log(data);
    localStorage.setItem("EditData", JSON.stringify(data));
    setTimeout(() => {
        window.open(`/update-application-test/${data.Id}`, '__blank')
      setEditLoader(false);
    }, 2000);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={10}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ flex: 1 }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell key={"edit"}>Action</TableCell>
              <TableCell key={"delete"}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell key={"edit"}>
                      <Button
                        color="inherit"
                        variant="contained"
                        disabled={row["Id"] === editData?.Id && editLoader}
                        onClick={() => {
                          setEditData(row);
                          handleEdit(row);
                        }}
                      >
                        {row["Id"] === editData?.Id && editLoader ? (
                          <CircularProgress size={24} color="primary" />
                        ) : (
                          "Edit"
                        )}
                      </Button>
                    </TableCell>

                    <TableCell key={"delete"}>
                      <Button
                        color="error"
                        variant="contained"
                        disabled={row["Id"] === deleteId && deleteLoader}
                        onClick={() => {
                          setDeleteId(row["Id"]);
                          handleDelete(row["Id"]);
                        }}
                      >
                        {row["Id"] === deleteId && deleteLoader ? (
                          <CircularProgress size={24} color="primary" />
                        ) : (
                          "Delete"
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* {props.children} */}
      <div>
        {/* {console.log(props.children)} */}
        {/* {React.cloneElement(props.children, {
          open: openEditForm,
          setOpen: setOpenEditForm,
          data: editData,
          nextMethod,
        })} */}
        {editData &&
          React.Children.map(props.children, (child) => {
            return React.cloneElement(child, {
              open: openEditForm,
              setOpen: setOpenEditForm,
              data: editData,
              nextMethod,
            });
          })}
      </div>
    </Paper>
  );
}
