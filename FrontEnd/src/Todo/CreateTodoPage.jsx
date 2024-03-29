import React from "react";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "../styles/custom-datepicker.css";

import { todoActions, categoryActions } from "../_actions";
import { nameOf } from "../_helpers/uility";
import {
  Pane,
  TextInputField,
  Button,
  FormField,
  Combobox,
  TagInput
} from "evergreen-ui";

class CreateTodoPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todo: {
        title: "",
        description: "",
        categoryId: "",
        tags: []
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectedCategory = this.handleSelectedCategory.bind(this);
    this.handleSelectTag = this.handleSelectTag.bind(this);
    this.handleDeselectTag = this.handleDeselectTag.bind(this);
  }

  handleSelectTag(tag) {
    const { todo } = this.state;
    const tags = [...todo.tags, tag];
    this.setState({
      todo: {
        ...todo,
        tags: tags
      }
    });
  }

  handleDeselectTag(tag) {
    const { todo } = this.state;
    const tags = [...todo.tags].filter(x => x.value !== tag.value);
    this.setState({
      todo: {
        ...todo,
        tags: tags
      }
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { todo } = this.state;
    this.setState({
      todo: {
        ...todo,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { todo } = this.state;
    //const { tags, ...todoParam } = this.state.todo;
    //tags && (todoParam.tags = tags.map(x => ({ id: parseInt(x.value) })));
    //todoParam = { tags, ...todo };
    if (todo.title && todo.description && todo.categoryId) {
      this.props.create(todo);
    }
  }

  handleSelectedCategory(category) {
    const { todo } = this.state;
    this.setState({
      todo: {
        ...todo,
        categoryId: category.id
      }
    });
  }

  componentDidMount() {
    this.props.loadCategories();
  }

  render() {
    const { todo, submitted } = this.state;
    const { tags } = todo;
    //if (!categoriesLoaded) return <div>loading ...</div>;
    const {
      category: { loading: loadingCategory, items: categories }
    } = this.props;
    const { title, description, categoryId } = todo;
    const selected = categories
      ? categories.find(x => x.id === categoryId) || categories[0]
      : {};
    //selected && selected.id && this//this.handleSelectedCategory(selected);
    //const categories = category.items;
    return (
      <Pane width={400} marginTop={50}>
        {loadingCategory && <em>Loading categories...</em>}
        {!loadingCategory && !categories && <div>Could not load category</div>}
        {categories && (
          <form name="form" onSubmit={this.handleSubmit}>
            <TextInputField
              marginBottom={12}
              isInvalid={submitted && !title}
              name={nameOf({ title })}
              label="Title"
              value={title}
              required
              onChange={this.handleChange}
            />
            <TextInputField
              marginBottom={12}
              isInvalid={submitted && !description}
              name={nameOf({ description })}
              label="Description"
              value={description}
              onChange={this.handleChange}
            />
            <FormField label="Category" marginBottom={12}>
              <Combobox
                //initialSelectedItem={selected}
                style={
                  submitted && !categoryId
                    ? { borderColor: "red", borderStyle: "solid" }
                    : {}
                }
                items={categories}
                itemToString={item => (item ? item.title : "")}
                onChange={item => this.handleSelectedCategory(item)}
                required
                width="100%"
              />
            </FormField>
            <FormField label="Tag" marginBottom={12}>
              <TagInput
                inputProps={{ placeholder: "Add tags..." }}
                width="100%"
                values={tags}
                onChange={values => {
                  this.setState({
                    todo: {
                      ...todo,
                      tags: values
                    }
                  });
                }}
              ></TagInput>
              {/* <SelectMenu
                isMultiSelect
                title="Select tags"
                options={tags.map(x => ({ label: x.name, value: x.id.toString() }))}
                selected={selectedTags.map(x => x.value.toString())}
                onSelect={tag => this.handleSelectTag(tag)}
                onDeselect={tag => this.handleDeselectTag(tag)}
              >
                <Button onClick={() => false} type="button">
                  {selectedTags && selectedTags.length > 0
                    ? selectedTags.map(x => x.label).join(', ')
                    : "Select multiple..."}
                </Button>
              </SelectMenu> */}
            </FormField>

            <FormField isRequired={false} label=" ">
              <Button>Create</Button>
              {/* {registering && (
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            )} */}
            </FormField>
          </form>
        )}
      </Pane>
    );
  }
}

function mapState(state) {
  const { category } = state;
  return { category };
}

const actionCreators = {
  create: todoActions.create,
  loadCategories: categoryActions.getAll
};

const connectedCreateTodoPage = connect(
  mapState,
  actionCreators
)(CreateTodoPage);
export { connectedCreateTodoPage as CreateTodoPage };
