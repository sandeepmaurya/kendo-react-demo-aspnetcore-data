import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, GridColumn as Column, GridDetailRow, GridCell, DropDownList } from '@progress/kendo-react-grid';

class MyCommandCell extends GridCell {
    render() {
        return (
            <td>
                <button
                    className="k-primary k-button k-grid-edit-command"
                > {JSON.stringify(this.props.dataItem.description)}
                </button>
            </td>
        );
    }
};

class MyDropDownCell extends GridCell {
    sizes = ["X-Small", "Small", "Medium", "Large", "X-Large", "2X-Large"];
    render() {
        return (
            <td>
                <select>
                    {this.sizes.map(function (name, index) {
                        return <option value={index}>{name}</option>;
                    })}
                </select>
            </td>
        );
    }
};

class DetailComponent extends GridDetailRow {
    constructor(props) {
        super(props);
        this.CommandCell = MyCommandCell;
        this.DropDownCell = MyDropDownCell;
    }

    render() {
        return (
            <Grid data={this.props.dataItem.details}>
                <Column field="productId" title="Product ID" width="120px" />
                <Column field="productName" title="Product Name" />
                <Column field="unitPrice" title="Unit Price" format="{0:c}" />
                <Column cell={this.DropDownCell} />
                <Column cell={this.DropDownCell} />
            </Grid>
        );
    }
}

class GridExample2 extends React.Component {
    baseUrl = `api/products/`;
    init = { method: 'GET', accept: 'application/json', headers: {} };

    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
        this.expandChange = this.expandChange.bind(this);
        this.CommandCell = MyCommandCell;
        this.DropDownCell = MyDropDownCell;
    }

    expandChange(event) {
        let dataItem = event.dataItem;
        dataItem.expanded = !dataItem.expanded;
        this.forceUpdate();
        if (!dataItem.expanded) {
            return;
        }
        fetch(this.baseUrl + `ProductsByCategory/` + dataItem.categoryId, this.init)
            .then(response => response.json())
            .then(json => {
                let data = this.state.categories.slice();
                let index = data.findIndex(d => d.categoryId === dataItem.categoryId);
                data[index].details = json;
                this.setState({ categories: data });
            });
    }

    componentDidMount() {
        fetch(this.baseUrl + `Categories`, this.init)
            .then(response => response.json())
            .then(json => this.setState({ categories: json }));
    }

    render() {
        return (
            <div>
                <Grid
                    style={{ height: '550px' }}
                    data={this.state.categories}
                    detail={DetailComponent}
                    expandField="expanded"
                    expandChange={this.expandChange}
                >
                    <Column field="categoryId" title="ID"/>
                    <Column field="categoryName" title="Category Name" />
                    <Column field="description" />
                    <Column cell={this.CommandCell}/>
                    <Column cell={this.DropDownCell} />
                    <Column cell={this.DropDownCell} />
                </Grid>
            </div>
        );
    }
}


export default GridExample2;
