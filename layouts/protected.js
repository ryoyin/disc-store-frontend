const Protected = (props) => {
    if (!props.user) {
        if (props.fail) {
            return props.fail();
        }
        return null;
    }

    return props.render();
}

export default Protected