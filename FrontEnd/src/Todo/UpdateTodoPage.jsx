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

class UpdateTodoPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todo: {
        title: "",
        description: "",
        categoryId: "",
        tags: [],
        ...props.todo
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

  handleSubmit() {
    this.setState({ submitted: true });
    const { todo } = this.state;
    //const { tags, ...todoParam } = this.state.todo;
    //tags && (todoParam.tags = tags.map(x => ({ id: parseInt(x.value) })));
    //todoParam = { tags, ...todo };
    if (todo.id && todo.title && todo.description && todo.categoryId) {
      this.props.update(todo);
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
      <Pane width={400} marginTop={12}>
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
                initialSelectedItem={selected}
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
            </FormField>

            {/* <FormField isRequired={false} label=" ">
              <Button>Create</Button>
            </FormField> */}
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
  update: todoActions.update,
  loadCategories: categoryActions.getAll
};

const connectedUpdateTodoPage = connect(
  mapState,
  actionCreators,
  null, 
  {withRef: true}
)(UpdateTodoPage);
export { connectedUpdateTodoPage as UpdateTodoPage };
