module.exports = {
    meta: {
      type: 'problem',
      docs: {
        description: 'Disallow static string literals in JSX',
      },
      messages: {
        noStaticString: 'Avoid using static string literals in JSX. Use constants instead.',
      },
      schema: [], // no options
    },
    create(context) {
      return {
        JSXText(node) {
          const value = node.value.trim();
          if (value && !/^{.*}$/.test(value)) {
            context.report({
              node,
              messageId: 'noStaticString',
            });
          }
        },
        Literal(node) {
          if (
            node.parent &&
            node.parent.type === 'JSXAttribute' &&
            typeof node.value === 'string'
          ) {
            context.report({
              node,
              messageId: 'noStaticString',
            });
          }
        },
      };
    },
  };