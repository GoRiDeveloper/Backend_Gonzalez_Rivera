function asObj (ref) {

    const OBJ = {

        id: ref.id,
        ...ref.data()

    };

    return OBJ;

};

export { asObj };