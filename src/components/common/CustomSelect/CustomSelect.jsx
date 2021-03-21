import React from "react";
import "./styles.scss";
class CustomSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: props.selectedOption || props.defaultOption,
      showDropdown: false,
    };
  }

  toggleDropdown = () => {
    this.setState((prevState) => {
      return { showDropdown: !prevState.showDropdown };
    });
  };

  setSelectedOption = (event) => {
    const selectedOption = event.target.getAttribute("value");
    const { onChange } = this.props;

    this.setState({ selectedOption, showDropdown: false });

    if (onChange) {
      onChange(selectedOption);
    }
  };

  render() {
    const { showDropdown, selectedOption } = this.state;
    const { options, name, label } = this.props;
    const optionKeys = Object.keys(options);

    const styles = {
      dropdown: {
        fontFamily: "Helvetica",
        color: "#6f6f6f",
        letterSpacing: 0.5,
        fontWeight: 300,
        outline: "none",
        position: "relative",
        width: "100%",
        display: "inline-block",
        marginTop: "2em",
      },
      icon: {
        color: "grey",
        fontSize: 16,
        transform: "none",
        transition: "all 0.1s ease-in",
      },
      list: {
        background: "#FFFFFF",
        border: "1px solid grey",
        borderBottom: "none",
        borderBottomLeftRadius: "3px",
        borderBottomRightRadius: "3px",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        // boxShadow: "0 6px 16px 0 rgba(0, 0, 0, 0.06)",
        listStyle: "none",
        marginTop: -1,
        // overflowY: "hidden",
        padding: 0,
        position: "absolute",
        width: "100%",
        zIndex: 10,
        textAlign: "center",
      },
      listItem: {
        alignItems: "center",
        borderBottom: "1px solid grey",
        cursor: "pointer",
        display: "flex",
        fontSize: "1.8em",
        // justifyContent: "space-between",
        justifyContent: "center",
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 20,
        paddingTop: 15,
        icon: {
          color: "#31D0EC",
          fontSize: 14,
        },
      },
      selectedOption: {
        alignItems: "center",
        justifyContent: "center",
        background: "#FFFFFF",
        border: "1px solid grey",
        ...(showDropdown && {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }),
        ...(!showDropdown && {
          borderBottomLeftRadius: "3px",
          borderBottomRightRadius: "3px",
        }),
        borderTopLeftRadius: "3px",
        borderTopRightRadius: "3px",
        cursor: "pointer",
        display: "flex",
        // justifyContent: "space-between",
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 20,
        paddingTop: 15,
        marginBottom: -3,
      },
      selectedOptionLink: {
        color: "gray",
        fontSize: 17,
        fontWeight: "400",
      },
    };

    return (
      <div style={styles.dropdown} tabIndex={1}>
        <div style={styles.selectedOption} onClick={this.toggleDropdown}>
          <span style={styles.selectedOptionLink}>
            {options[selectedOption] || label}
          </span>
          <i
            className={`fa fa-chevron-${showDropdown ? "up" : "down"}`}
            style={styles.icon}
          />
        </div>
        <ul className={`${showDropdown ? "show" : ""}`} style={styles.list}>
          {optionKeys.map((optionKey, index) => (
            <li
              style={styles.listItem}
              key={index}
              name={name}
              value={optionKey}
              onClick={this.setSelectedOption}
            >
              {options[optionKey]}
              <i
                className={`far fa-${
                  selectedOption === optionKey ? "dot-circle" : "circle"
                }`}
                style={styles.listItem.icon}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default CustomSelect;
