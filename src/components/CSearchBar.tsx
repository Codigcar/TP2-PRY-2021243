import React, {useState} from 'react';
import {View, Platform, FlatList, Text} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {SearchBarBaseProps} from 'react-native-elements/dist/searchbar/SearchBar';
import {Styles} from '../assets/css/Styles';
const CSearchBar = ({
  accidents,
  search,
  setSearch,
  filteredDataSource,
  setFilteredDataSource,
  rendeItem,
}: any) => {

  const SafeSearchBar = SearchBar as unknown as React.FC<SearchBarBaseProps>;

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = accidents.filter(function (item: any) {
        const itemData = item.user.dni;
        return itemData.indexOf(text) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(accidents);
      setSearch(text);
    }
  };

  return (
    <View>
      <SafeSearchBar
        containerStyle={{
          backgroundColor: '#fff',
          borderTopColor: '#FFF',
          borderBottomColor: '#FFF',
          paddingHorizontal: 0,
          ...Platform.select({
            ios: {
              paddingVertical: 0,
              borderRadius: 10,
            },
          }),
        }}
        inputContainerStyle={Styles.estiloBarraBusqueda}
        onChangeText={(text: string) => searchFilterFunction(text)}
        onClear={() => searchFilterFunction('')}
        placeholder="Buscar por DNI..."
        value={search}
        platform={'android'}
      />
      <View>
        {accidents.length > 0 ? (
          <View>
            {typeof filteredDataSource === 'string' ? (
              <FlatList
                data={accidents}
                keyExtractor={(item, index) => index.toString()}
                renderItem={rendeItem}
              />
            ) : (
              <>
                {filteredDataSource.length === 0 ? (
                  <View
                    style={{
                      height: '80%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>No se encontraron alertas con este DNI</Text>
                  </View>
                ) : (
                  <FlatList
                    data={filteredDataSource}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={rendeItem}
                  />
                )}
              </>
            )}
          </View>
        ) : (
          <View
            style={{
              height: '80%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Aún no hay alertas nuevas</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default CSearchBar;
