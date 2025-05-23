import {
	IconDownload,
	IconLoader2,
	IconPencil,
	IconPlus,
	IconSearch,
	IconTrash,
	IconChevronUp,
	IconChevronDown,
	IconAlertTriangle,
	IconCheck,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import type { File, SortDirection, SortField } from "../types/types";
import { getFileDownloadLink, getFiles, uploadFile } from "../utils/actions";
import { FileObject } from "@supabase/storage-js";
import { getFileType } from "../scripts/helper";
import { Link } from "react-router";
import supabase from "../utils/supabase";
import { useToast } from "../hooks/useToast";

const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toISOString().split("T")[0];
};

const convertToFileFormat = (fileObject: FileObject): File => {
	return {
		id: fileObject.id || fileObject.name, // Use name as fallback ID if id is not available
		name: fileObject.name,
		type: getFileType(fileObject.name),
		uploadedAt: formatDate(fileObject.created_at || new Date().toISOString()),
	};
};

const FileActions = ({
	fileName,
	files,
	setFiles,
}: {
	fileName: string;
	files: File[];
	setFiles: (files: File[]) => void;
}) => {
	const [downloadLink, setDownloadLink] = useState("");
	const [showConfirmDialog, setShowConfirmDialog] = useState(false);

	useEffect(() => {
		const fetchLink = async () => {
			const response = await getFileDownloadLink(fileName);
			setDownloadLink(response);
		};

		fetchLink();
	}, [fileName]);

	// Actual delete function
	const confirmDeleteFile = async () => {
		await supabase.storage.from("files").remove([`document/${fileName}`]);
		setFiles(files.filter((file) => file.name !== fileName));
		setShowConfirmDialog(false);
	};

	return (
		<div className="w-min flex flex-nowrap mx-auto">
			<Link
				to={downloadLink}
				className="px-2 py-1 rounded-sm hover:scale-90"
				title="Download file"
			>
				<IconDownload />
			</Link>
			<button
				onClick={() => alert("Renaming file...")}
				className="px-2 py-1 rounded-sm hover:scale-90"
				title="Rename file"
			>
				<IconPencil />
			</button>
			<button
				onClick={() => setShowConfirmDialog(true)}
				className="px-2 py-1 rounded-sm hover:scale-90 text-red-700"
				title="Delete file"
			>
				<IconTrash />
			</button>
			{showConfirmDialog && (
				<div className="backdrop-blur-sm w-full h-full fixed top-0 left-0 backdrop-brightness-50">
					<div className="rounded-sm bg-neutral-300 p-6 fixed self-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
						<h4 className="font-semibold text-lg mb-2">Delete File</h4>
						<hr className="mb-4" />
						<p className="font-semibold pb-4 text-nowrap">
							Are you sure you want to delete the file{" "}
							<strong>{fileName}</strong>?
						</p>
						<div className="w-min flex gap-2 flex-nowrap mx-auto">
							<button
								className="px-2 py-1 rounded-sm hover:scale-95 bg-neutral-700 text-white"
								onClick={() => setShowConfirmDialog(false)}
							>
								Cancel
							</button>
							<button
								className="px-2 py-1 rounded-sm hover:scale-95 bg-red-700 text-white"
								onClick={confirmDeleteFile}
							>
								Confirm
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

const FilesTable = ({
	files,
	setFiles,
}: {
	files: File[];
	setFiles: (files: File[]) => void;
}) => {
	const [sortField, setSortField] = useState<SortField>(null);
	const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

	if (!files) {
    return (
			<div className="py-20">
				<IconLoader2 className="animate-spin mx-auto" />
			</div>
		);
  } else if (files.length === 0) {
    return <p>No files found</p>;
  }

	const handleSort = (field: SortField) => {
		if (sortField === field) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortField(field);
			setSortDirection("asc");
		}
	};

	const getSortIcon = (field: SortField) => {
		if (sortField !== field) return null;
		return sortDirection === "asc" ? (
			<IconChevronUp className="inline-block ml-1 size-4" />
		) : (
			<IconChevronDown className="inline-block ml-1 size-4" />
		);
	};

	const sortedFiles = [...files].sort((a, b) => {
		if (!sortField) return 0;

		let comparison = 0;
		if (sortField === "name") {
			comparison = a.name.localeCompare(b.name);
		} else if (sortField === "type") {
			comparison = a.type.localeCompare(b.type);
		} else if (sortField === "uploadedAt") {
			const dateA = new Date(a.uploadedAt);
			const dateB = new Date(b.uploadedAt);
			comparison = dateA.getTime() - dateB.getTime();
		}

		return sortDirection === "asc" ? comparison : -comparison;
	});

	return (
		<div className="w-full overflow-x-auto">
			<table className="w-full border-collapse">
				<thead>
					<tr className="bg-neutral-300">
						<th
							className="text-left p-3 font-semibold cursor-pointer hover:bg-neutral-400 transition-colors"
							onClick={() => handleSort("name")}
						>
							File Name {getSortIcon("name")}
						</th>
						<th
							className="text-left p-3 font-semibold cursor-pointer hover:bg-neutral-400 transition-colors"
							onClick={() => handleSort("type")}
						>
							Type {getSortIcon("type")}
						</th>
						<th
							className="text-left p-3 font-semibold cursor-pointer hover:bg-neutral-400 transition-colors"
							onClick={() => handleSort("uploadedAt")}
						>
							Uploaded {getSortIcon("uploadedAt")}
						</th>
						<th className="text-center p-3 font-semibold">Actions</th>
					</tr>
				</thead>
				<tbody>
					{sortedFiles.map((file) => (
						<tr
							key={file.id}
							className={`border-t border-neutral-300 even:bg-neutral-300 transition-colors`}
						>
							<td className="p-3">{file.name}</td>
							<td className="p-3">{file.type}</td>
							<td className="p-3">{file.uploadedAt}</td>
							<td className="p-3">
								<FileActions
									fileName={file.name}
									files={files}
									setFiles={setFiles}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

const Files = () => {
	const [files, setFiles] = useState<File[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { message, setMessage, toastVisible } = useToast();

	useEffect(() => {
		const fetchFiles = async () => {
			try {
				setLoading(true);
				const response = await getFiles();

				// Transform the FileObject array into our File type array
				const formattedFiles = response.map(convertToFileFormat);

				setFiles(formattedFiles);
				setError(null);
			} catch (e) {
				console.error("Error fetching files:", e);
				setError("Failed to load files");
			} finally {
				setLoading(false);
			}
		};

		fetchFiles();
	}, []); // Only fetch on component mount

	// Search functionality
	const [searchQuery, setSearchQuery] = useState("");

	// Filter files based on search query
	const filteredFiles = files.filter(
		(file) =>
			file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			file.type.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Handle upload new file action
	const handleUploadNewFile = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];

		if (!file) {
			setMessage({ text: "No file selected", type: "error" });
			return;
		}

		if (event.target.files && event.target.files.length > 1) {
			for (const file of event.target.files) {
				const response = await uploadFile(file);
				if (response && response.message) {
					setMessage({
						text: "File name contains invalid characters. Please remove characters like /, #, ?, etc.",
						type: "error",
					});
					return;
				}
			}
			const updatedFiles = await getFiles();
			setFiles(updatedFiles.map(convertToFileFormat));
			setMessage({ text: "Files uploaded successfully", type: "success" });
		} else {
			const existingFile = await fileExists(file.name);
			if (existingFile) {
				setMessage({ text: "File already exists", type: "error" });
				return;
			}

			const response = await uploadFile(file);
			if (response && response.message) {
				setMessage({
					text: "File name contains invalid characters. Please remove characters like /, #, ?, etc.",
					type: "error",
				});
				return;
			}

			const updatedFiles = await getFiles();
			setFiles(updatedFiles.map(convertToFileFormat));
			setMessage({ text: "File uploaded successfully", type: "success" });
		}
	};

	// Helper function to check if a file exists
	const fileExists = async (fileName: string) => {
		const allFiles = await getFiles();
		return allFiles.some((f) => f.name === fileName);
	};

	return (
		<div className="min-h-screen w-full p-4 flex items-start justify-center">
			<div className="w-full max-w-4xl bg-neutral-200 mb-20 rounded-sm shadow-sm mt-[5vh] overflow-hidden">
				{/* Header */}
				<div className="p-6 pb-2">
					<h3 className="font-semibold">Files</h3>
					<p className="text-sm text-neutral-600">
						View and manage system files
					</p>
				</div>

				{/* Content */}
				<div className="p-6 space-y-6">
					{/* Files Table Section */}
					<div>
						<div className="flex items-center justify-between">
							<h4 className="font-semibold text-lg mb-2">Library</h4>
							{/* Action Button */}
							<div>
								<label className="rounded-sm px-4 py-2 transition-colors flex items-center bg-neutral-700 text-white hover:bg-neutral-800 cursor-pointer">
									<IconPlus className="inline mr-1" /> Upload
									<input
										type="file"
										multiple
										onChange={handleUploadNewFile}
										className="hidden"
									/>
								</label>
							</div>
						</div>
						<hr className="mb-4" />
						{/* Search Bar */}
						<div className="mb-4">
							<div className="relative">
								<input
									type="text"
									placeholder="Search files..."
									className="w-full p-2 pl-8 border border-neutral-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-neutral-500"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
								<div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neutral-500">
									<IconSearch className="size-4" />
								</div>
							</div>
						</div>

						{loading ? (
							<div className="py-20">
								<IconLoader2 className="animate-spin mx-auto" />
							</div>
						) : error ? (
							<div className="py-10 text-center text-red-700 font-semibold flex flex-col">
								{" "}
								<IconAlertTriangle className="mx-auto" /> {error}
							</div>
						) : (
							<FilesTable files={filteredFiles} setFiles={setFiles} />
						)}
					</div>
				</div>
			</div>
			{/* Toast Notification */}
			{message.text && (
				<div
					className={`fixed top-2 right-2 transition-opacity duration-300 ease-in-out ${
						toastVisible ? "opacity-100" : "opacity-0"
					}`}
				>
					<div
						className={`flex items-center gap-2 rounded-sm px-4 py-3 text-white shadow-md ${
							message.type === "error" ? "bg-red-700" : "bg-green-700"
						}`}
					>
						{message.type === "error" ? <IconAlertTriangle /> : <IconCheck />}
						<p>{message.text}</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default Files;
