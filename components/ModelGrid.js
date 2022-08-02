import * as React from 'react';
import { DataTable } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const optionsPerPage = [2, 3, 4];

const ModelGrid = () => {
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  const navigation = useNavigation();

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Unit name</DataTable.Title>
        <DataTable.Title numeric>built</DataTable.Title>
        <DataTable.Title numeric>primed</DataTable.Title>
        <DataTable.Title numeric>painted</DataTable.Title>
      </DataTable.Header>

      <DataTable.Row onPress={() => navigation.navigate('Model', {})}>
        <DataTable.Cell>Intercessors</DataTable.Cell>
        <DataTable.Cell numeric>10</DataTable.Cell>
        <DataTable.Cell numeric>0</DataTable.Cell>
        <DataTable.Cell numeric>2</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Rhino</DataTable.Cell>
        <DataTable.Cell numeric>0</DataTable.Cell>
        <DataTable.Cell numeric>0</DataTable.Cell>
        <DataTable.Cell numeric>0</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Librarian</DataTable.Cell>
        <DataTable.Cell numeric>1</DataTable.Cell>
        <DataTable.Cell numeric>0</DataTable.Cell>
        <DataTable.Cell numeric>0</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Pagination
        page={page}
        numberOfPages={3}
        onPageChange={(page) => setPage(page)}
        label="1-2 of 6"
        optionsPerPage={optionsPerPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={'Rows per page'}
      />
    </DataTable>
  );
};

export default ModelGrid;