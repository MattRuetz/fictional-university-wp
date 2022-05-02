// CHECK OUT WordPress React Components before building from scratch!!
import {
    TextControl,
    Flex,
    FlexBlock,
    FlexItem,
    Button,
    Icon,
} from '@wordpress/components';
import './index.scss';

// IIFE - Immediately Invoked Function Expression
(function () {
    let locked = false;

    // trigger every time a block on the page updates
    wp.data.subscribe(function () {
        const result = wp.data
            .select('core/block-editor')
            .getBlocks()
            .filter(function (block) {
                return (
                    block.name == 'outplugin/are-you-paying-attention' &&
                    block.attributes.correctAnswer == undefined
                );
            }); //filter should be empty, unless the a correct-answer field is unset on an instance of this block

        if (result.length && locked == false) {
            // DONT ALLOW Update Post
            locked = true;
            wp.data.dispatch('core/editor').lockPostSaving('noanswer');
        }

        if (!result.length && locked) {
            // ALLOW to Update Post
            locked = false;
            wp.data.dispatch('core/editor').unlockPostSaving('noanswer');
        }
    });
})();

wp.blocks.registerBlockType('outplugin/are-you-paying-attention', {
    title: 'Are You Paying Attention?',
    icon: 'smiley',
    category: 'common',
    attributes: {
        question: { type: 'string' },
        answers: { type: 'array', default: [''] },
        correctAnswer: { type: 'number', default: undefined },
    },
    // React Component!
    edit: EditComponent,
    // React Component!
    save: function (props) {
        return null; //let PHP handle saved block to update block without having to update post in admin
    },
});

function EditComponent(props) {
    function updateQuestion(value) {
        props.setAttributes({
            question: value,
        });
    }

    function deleteAnswer(indexToDelete) {
        const newAnswers = props.attributes.answers.filter(function (x, index) {
            return index != indexToDelete;
        });
        props.attributes.correctAnswer === indexToDelete &&
            props.setAttributes({ correctAnswer: undefined });
        props.setAttributes({ answers: newAnswers });
    }
    function markAsCorrect(index) {
        props.setAttributes({ correctAnswer: index });
    }

    return (
        <div className="paying-attention-edit-block">
            {/* TextControl is a WordPress React component */}
            <TextControl
                value={props.attributes.question}
                onChange={updateQuestion}
                label="Question:"
                style={{ fontSize: '20px' }}
            />
            <p style={{ fontSize: '13px', margin: '20px 0 8px 0' }}>Answers:</p>
            {props.attributes.answers.map(function (answer, index) {
                return (
                    <Flex>
                        <FlexBlock>
                            <TextControl
                                autoFocus={answer === undefined}
                                value={answer}
                                onChange={(newValue) => {
                                    const newAnswers =
                                        props.attributes.answers.concat([]);
                                    newAnswers[index] = newValue;
                                    props.setAttributes({
                                        // SET ATTRIBUTES = UPDATE STATE (live)
                                        answers: newAnswers,
                                    });
                                }}
                            />
                        </FlexBlock>
                        <FlexItem>
                            <Button onClick={() => markAsCorrect(index)}>
                                <Icon
                                    className="mark-as-correct"
                                    icon={
                                        props.attributes.correctAnswer == index
                                            ? 'star-filled'
                                            : 'star-empty'
                                    }
                                />
                            </Button>
                        </FlexItem>
                        <FlexItem>
                            <Button
                                isLink
                                className="attention-delete"
                                onClick={() => deleteAnswer(index)}
                            >
                                Delete
                            </Button>
                        </FlexItem>
                    </Flex>
                );
            })}
            <Button
                isPrimary
                onClick={() => {
                    props.setAttributes({
                        // Add another empty string to answers array
                        answers: props.attributes.answers.concat([undefined]),
                    });
                }}
            >
                Add another answer
            </Button>
        </div>
    );
}
