import { Select, SelectProps } from 'antd';
import { debounce } from 'lodash';
import { useState } from 'react';
import { useGetTickets } from '../hooks/useQuery';

type TicketSelectProps = SelectProps;

export default function TicketSelect(props: TicketSelectProps) {
  const { ...rest } = props;

  const [search, setSearch] = useState('');

  const dataHook = useGetTickets({
    params: {
      search,
    },
    options: {
      staleTime: 3000,
    },
  });

  return (
    <>
      <Select
        showSearch
        placeholder="Select a user"
        optionFilterProp="children"
        filterOption={(input, option) =>
          (String(option?.label) ?? '')
            .toLowerCase()
            .includes(input.toLowerCase())
        }
        options={dataHook.data?.items.map((item) => ({
          label: item.name,
          value: item.id,
        }))}
        loading={dataHook.isFetching}
        onSearch={debounce(setSearch, 500)}
        allowClear
        {...rest}
      />
    </>
  );
}
