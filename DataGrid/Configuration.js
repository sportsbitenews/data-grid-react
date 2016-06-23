/**
 * Clase encargada de manejar todas las confuraciones
 * de la Grid
 */

import * as ColumnFilterGrid from './ColumnFilterGrid';


class Configuration {

	/**
	 * inicializa la configuracion basica
	 * para el componente
	 */
	constructor(columns) {
		this.columns = columns;
		this.columnsName = [];
		this.columnsMetaData = [];
		this.init();
	}

	/**
	 * Setea los valores para la configuracion
	 * del componente
	 */
	init() {
		
		this.columns.forEach((element) => {
			// normaliza los columns name
			if(typeof element.visible === 'undefined' || element.visible === true) {
				this.columnsName.push(element.columnName);
			}

			// normaliza los columns meta data
			if(typeof element.filter !== 'undefined') {
				element.customHeaderComponent = this.getComponentFilterHeader(element.filter);
				element.customHeaderComponentProps = {
					dataFilter: element.dataFilter,
					visible: false
				};
			}

			this.columnsMetaData.push(element);

		})
	
	}

	/**
	 * Recibe como parametro un string
	 * que indica que tipo de component/filter
	 * retornara
	 *
	 * @param String typeFilter
	 * @return Function
	 */
	getComponentFilterHeader(typeFilter) {

		let componentFilter;

		switch (typeFilter) {
			case "text":
				componentFilter = ColumnFilterGrid.ComponentText;
			break;
			case "date":
				componentFilter = ColumnFilterGrid.ComponentDate;
			break;
			case "select":
				componentFilter = ColumnFilterGrid.ComponentSelect;
			break;
			case "number":
				componentFilter = ColumnFilterGrid.ComponentNumber;
			break;
		}

		return componentFilter;
	}

	/**
	 * Obtiene los columns name para las
	 * componente
	 * @return array
	 */
	get getColumnName() {
		return this.columnsName;
	}

	/**
	 * Obtiene los column meta data
	 * para el componente
	 * @return array
	 */
	get getColumnMetaData() {
		return this.columnsMetaData;
	}


}

export default Configuration;