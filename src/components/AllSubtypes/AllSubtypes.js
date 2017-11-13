
import React from 'react'
import PropTypes from 'prop-types'

import style from './AllSubtypes.styl'

const AllSubtypes = props =>
  <div className={style['table-wrapper']}>
    <table className={style['subtype-table']}>
      <tbody>
        {
          props.subtypes.map((type, i) =>
            <tr key={type.typeName}>
              <td>
                <div
                  className={style['bg-element']}
                  style={{ backgroundPosition: `-${i * 3.652}rem center` }}
                />
                <div className={style['title']}>{type.typeName}</div>
              </td>
              <td>
                {
                  type.subtypes.map(subtype =>
                    <span
                      className={style['subtype']}
                      key={subtype}
                      onClick={() => props.onSubtypeClick(type.typeName, subtype)}
                    >
                      {subtype}
                    </span>
                  )
                }
              </td>
            </tr>
          )
        }
      </tbody>
    </table>
  </div>

AllSubtypes.propTypes = {
  onSubtypeClick: PropTypes.func.isRequired
}

export default AllSubtypes
