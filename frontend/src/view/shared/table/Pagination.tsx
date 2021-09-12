import React from 'react';
import RCPagination from 'rc-pagination';
import { getLanguage } from 'src/i18n';
import PaginationWrapper from 'src/view/shared/table/styles/PaginationWrapper';
import { i18n } from 'src/i18n';
import PropTypes from 'prop-types';

const Pagination = (props) => {
  const onChange = (current, pageSize) => {
    props.onChange({
      current: Number(current),
      pageSize: Number(pageSize),
    });
  };

  const locale = getLanguage().dictionary.pagination;
  const { pagination, disabled, showTotal } = props;
  const { current, pageSize, total } = pagination;
  return (
    <PaginationWrapper>
      <RCPagination
        pageSize={Number(pageSize)}
        current={current}
        onChange={onChange}
        total={total}
        locale={locale}
        showTotal={showTotal || undefined}
      />

      <select
        style={{
          width: 'auto',
        }}
        disabled={!total || disabled}
        className="ml-2 form-control form-control-sm"
        value={Number(pageSize)}
        onChange={(event) =>
          onChange(1, event.target.value)
        }
      >
        <option value={10}>
          10 {i18n('pagination.items_per_page')}
        </option>
        <option value={20}>
          20 {i18n('pagination.items_per_page')}
        </option>
        <option value={30}>
          30 {i18n('pagination.items_per_page')}
        </option>
        <option value={40}>
          40 {i18n('pagination.items_per_page')}
        </option>
      </select>
    </PaginationWrapper>
  );
};

Pagination.propTypes = {
  pagination: PropTypes.object,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  showTotal: PropTypes.func,
};

export default Pagination;
