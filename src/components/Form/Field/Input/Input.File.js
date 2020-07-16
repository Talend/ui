import React from 'react';
import { shade, tint } from 'polished';
import styled from 'styled-components';
import Input from './Input';
import Button from '../../../Button';
import Link from '../../../Link';
import Icon from '../../../Icon';
import tokens from '../../../../tokens';
import { VisuallyHidden } from 'reakit';

const FileField = styled.div(
	({ theme }) => `
	.input-file {
		position: relative;
		min-height: 3.2rem;
		border: 1px dashed ${theme.colors.inputBorderColor};
		border-radius: ${tokens.radii.inputBorderRadius};
	
		&:hover {
			border-color: ${theme.colors.inputBorderHoverColor};
		}

		&--dragging {
			background: ${tint(0.95, tokens.colors.lochmara)};
			border-width: 2px;
			border-color: ${tokens.colors.lochmara};
			
            .text__icon {
                fill: ${tokens.colors.lochmara};
            }
		}
		
		&__preview {
			min-height: 3.2rem;
		}

		&__input {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			opacity: 0;
		}
        
        &:hover {
            .text__icon {
                fill: ${tokens.colors.doveGray};
            }
        }
	}
	
	.text {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 3.2rem;
		
		&__icon {
			margin: 0 1rem;
			width: ${tokens.sizes.smaller};
			fill: ${tokens.colors.darkSilver};
		}
	}	
	
	.preview {
		position: relative;
		
		&__list {
			padding: 0 1rem;
			
			&-item {
				line-height: 3.2rem;
			}
		}
		
		&__button {
			position: absolute;
			top: 0;
			right: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			min-height: 3.2rem;
			border: none;
			
			svg {
				position: static;
				margin:0;
				width: ${tokens.sizes.smaller};
				
				path {
					fill: ${theme.colors.activeColor};
				}
			}
			
			&:focus {
			  	outline: none;
			}
			  
			&:hover {    
				svg path {
					fill: ${shade(0.25, theme.colors.activeColor)};
				}
			}
		}
	}
	
	.input {
		input {
			cursor: pointer;
		}
		
		&--filled {				
			pointer-events: none;

			input {
				cursor: auto; 
			}
		}
	}
`,
);

function returnFileSize(number) {
	if (number < 1024) {
		return number + 'bytes';
	} else if (number > 1024 && number < 1048576) {
		return (number / 1024).toFixed(1) + 'KB';
	} else if (number > 1048576) {
		return (number / 1048576).toFixed(1) + 'MB';
	}
}

function InputFile(props) {
	const [drag, setDrag] = React.useState(false);
	const [files, setFiles] = React.useState();

	const inputRef = React.useRef();

	React.useEffect(() => {
		const input = inputRef.current;
		input?.addEventListener('dragenter', handleDragIn);
		input?.addEventListener('dragleave', handleDragOut);
		input?.addEventListener('drop', handleDrop);
		input?.addEventListener('change', handleChange);

		return () => {
			const input = inputRef.current;
			input?.removeEventListener('dragenter', handleDragIn);
			input?.removeEventListener('dragleave', handleDragOut);
			input?.removeEventListener('drop', handleDrop);
			input?.removeEventListener('change', handleChange);
		};
	}, []);

	function handleChange() {
		const input = inputRef.current;
		setFiles(() => [...input.files]);
	}

	function clear() {
		const input = inputRef.current;
		input.value = '';
		setFiles(() => null);
	}

	function handleDragIn(e) {
		if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
			setDrag(() => true);
		}
	}

	function handleDragOut(e) {
		setDrag(() => false);
	}

	function handleDrop(e) {
		setDrag(() => false);
	}

	const id = `info-${Math.round(Math.random() * 1e5)}`;

	return (
		<FileField aria-describedby={id}>
			<div id={id} className={`input-file ${drag ? 'input-file--dragging' : ''}`}>
				{!files ? (
					<div className="input-file__text text">
						<Icon className="text__icon" name="upload" />{' '}
						<span className="text__span">
							Drop your files or <Link className="text__link">browse</Link>
						</span>
					</div>
				) : (
					<div className="input-file__preview preview">
						<VisuallyHidden>You've selected:</VisuallyHidden>
						<ol className="preview__list">
							{files.map((file, index) => (
								<li className="preview__list-item" key={index}>
									{file.name} ({returnFileSize(file.size)})
								</li>
							))}
						</ol>
						<Button className="preview__button" onClick={clear}>
							<Icon className="preview__button-icon" name="cross" />
							<VisuallyHidden>Clear selection</VisuallyHidden>
						</Button>
					</div>
				)}
				<div className={`input-file__input input ${files ? 'input--filled' : ''}`}>
					<input type="file" {...props} ref={inputRef} />
				</div>
			</div>
		</FileField>
	);
}

function File(props) {
	return <Input as={InputFile} {...props} />;
}

export default File;
