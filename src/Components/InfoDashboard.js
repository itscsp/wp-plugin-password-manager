import React from 'react';
import styled from 'styled-components';

const InfoDashboard = ({ credentials }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Site URL Name</TableHeader>
          <TableHeader>Username</TableHeader>
          <TableHeader>Password</TableHeader>
          <TableHeader>Note</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {credentials.map((credential, index) => (
          <TableRow key={index}>
            <TableCell>{credential.siteName}</TableCell>
            <TableCell>{credential.username}</TableCell>
            <TableCell>{credential.password}</TableCell>
            <TableCell>{credential.note}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default InfoDashboard;

/* Styles for InfoDashboard component */
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHead = styled.thead`
  background-color: #f2f2f2;
`;

const TableRow = styled.tr``;

const TableHeader = styled.th`
  padding: 10px;
  font-weight: bold;
  text-align: left;
  border-bottom: 1px solid #ccc;
`;

const TableBody = styled.tbody``;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;
